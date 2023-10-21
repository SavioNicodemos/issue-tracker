import authOptions from '@/app/auth/authOptions';
import { patchIssueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

type Props = {
  params: {
    id: string;
  };
};

type PatchBody = z.infer<typeof patchIssueSchema>;

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  const { assignedToUserId, title, description } = body as PatchBody;

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  let user: User | null = null;
  if (assignedToUserId) {
    user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user)
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: Number(params.id) },
    data: {
      title,
      description,
      assignedToUserId: user?.id ?? null,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

  await prisma.issue.delete({ where: { id: Number(params.id) } });

  return NextResponse.json({ message: 'Issue deleted' }, { status: 200 });
}
