import IssueForm from '@/app/issues/_components/IssueFormDynamic';
import { getIssue } from '@/lib/dataService';
import { notFound } from 'next/navigation';
import { cache } from 'react';

interface Props {
  params: Promise<{ id: string }>;
}

const fetchIssue = cache((id: number) => getIssue(id));

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;

  if (isNaN(parseInt(id))) return notFound();

  const issue = await fetchIssue(parseInt(id));

  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchIssue(parseInt(id));
  return {
    title: `Issue Tracker - Edit ${issue?.title}`,
    description: 'Edit an issue passing a title and description',
  };
}

export default EditIssuePage;
