import authOptions from '@/auth/authOptions';
import { getUser, patchIssue, removeIssue } from '@/lib/dataService';
import { patchIssueSchema } from '@/schemas/issues';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

type Props = { params: Promise<{ id: string }> };
type PatchBody = z.infer<typeof patchIssueSchema>;

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assignedToUserId, title, description, status } = body as PatchBody;

  if (assignedToUserId) {
    const user = await getUser(assignedToUserId);
    if (!user)
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const updatedIssue = await patchIssue(Number(id), { title, description, status, assignedToUserId });
  if (!updatedIssue)
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });

  const { id } = await params;
  const deleted = await removeIssue(Number(id));
  if (!deleted)
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

  return NextResponse.json({ message: 'Issue deleted' }, { status: 200 });
}
