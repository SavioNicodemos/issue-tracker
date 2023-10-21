export const dynamic = 'force-dynamic';

import { IssueStatusBadge } from '@/app/components';
import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import IssueActions from './IssueActions';

type Props = {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
  }
}
type ColumnsProps = { label: string; value: keyof Issue; className?: string }[]

const columns: ColumnsProps = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div>
      <IssueActions />

      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <Link href={{
                  query: { ...searchParams, orderBy: column.value },
                }}>
                  {column.label}
                </Link>
                {column.value === searchParams.orderBy && <ArrowUpIcon className='inline' />}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssuesPage