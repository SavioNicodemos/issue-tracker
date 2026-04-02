import IssueFormSkeleton from '@/app/issues/_components/IssueFormSkeleton';
import IssueForm from '@/app/issues/_components/IssueFormDynamic';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { cache } from 'react';

interface Props {
  params: Promise<{ id: string }>
}

const fetchIssue = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }));

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;

  if (isNaN(parseInt(id))) {
    return notFound();
  }

  const issue = await fetchIssue(parseInt(id));

  if (!issue) notFound();

  return (
    <IssueForm issue={issue} />
  )
}


export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchIssue(parseInt(id));

  return {
    title: `Issue Tracker - Edit ${issue?.title}`,
    description: 'Edit an issue passing a title and description',
  }
}


export default EditIssuePage
