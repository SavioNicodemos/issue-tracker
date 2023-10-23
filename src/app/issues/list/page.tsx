import { Pagination } from '@/components';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import IssueActions from './_components/IssueActions';
import IssueTable, { columnNames } from './_components/IssueTable';

export type IssueQuery = {
  status: Status;
  orderBy: 'title' | 'status' | 'createdAt';
  page: string;
  order: 'asc' | 'desc';
}

type Props = {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const where = { status }

  const order = ['asc', 'desc'].includes(searchParams.order) ? searchParams.order : 'asc';

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: order }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />

      <IssueTable issues={issues} searchParams={searchParams} />

      <Pagination pageSize={pageSize} itemCount={issueCount} currentPage={page} />
    </Flex>
  )
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View a full list of project issues',
  keywords: ['issues', 'list', 'filter', 'sort', 'vercel', 'nextjs', 'prisma', 'react', 'free'],
  creator: 'Nicodemos Santos',
}

export default IssuesPage