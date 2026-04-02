import { Metadata } from 'next';
import IssueForm from '../_components/IssueFormDynamic';

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