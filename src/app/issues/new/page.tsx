import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from '../_components/IssueFormSkeleton';

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
);

const NewIssuePage = () => {
  return (
    <IssueForm />
  )
}


export const metadata: Metadata = {
  title: 'Create a New Issue - Issue Tracker',
  description: 'Create a new issue with a title and description',
  keywords: ['issues', 'create', 'filter', 'sort', 'vercel', 'nextjs', 'prisma', 'react', 'free'],
  creator: 'Nicodemos Santos',
}


export default NewIssuePage