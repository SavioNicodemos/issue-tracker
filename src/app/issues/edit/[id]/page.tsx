import IssueFormSkeleton from '@/app/issues/_components/IssueFormSkeleton';
import prisma from '@/prisma/client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { cache } from 'react';

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
);

interface Props {
  params: { id: string }
}

const fetchIssue = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }));

const EditIssuePage = async ({ params }: Props) => {
  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) notFound();

  return (
    <IssueForm issue={issue} />
  )
}


export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: `Issue Tracker - Edit ${issue?.title}`,
    description: 'Edit an issue passing a title and description',
  }
}


export default EditIssuePage