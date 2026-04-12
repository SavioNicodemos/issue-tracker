import { Pagination } from '@/components';
import { getIssues } from '@/lib/dataService';
import { Status } from '@/libs/status';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import IssueActions from './_components/IssueActions';
import IssueTable, { columnNames } from './_components/IssueTable';

export type IssueQuery = {
  status: Status;
  orderBy: 'title' | 'status' | 'createdAt';
  page: string;
  order: 'asc' | 'desc';
};

type Props = {
  searchParams: Promise<IssueQuery>;
};

const IssuesPage = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams;

  const status = Object.values(Status).includes(resolvedParams.status)
    ? resolvedParams.status
    : undefined;

  const order = ['asc', 'desc'].includes(resolvedParams.order) ? resolvedParams.order : 'asc';

  const orderBy = columnNames.includes(resolvedParams.orderBy)
    ? { [resolvedParams.orderBy]: order as 'asc' | 'desc' }
    : undefined;

  const page = parseInt(resolvedParams.page) || 1;
  const pageSize = 10;

  const { issues, count: issueCount } = await getIssues({ status, orderBy, page, pageSize });

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable issues={issues} searchParams={resolvedParams} />
      <Pagination pageSize={pageSize} itemCount={issueCount} currentPage={page} />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View a full list of project issues',
  keywords: ['issues', 'list', 'filter', 'sort', 'vercel', 'nextjs', 'prisma', 'react', 'free'],
  creator: 'Nicodemos Santos',
};

export default IssuesPage;
