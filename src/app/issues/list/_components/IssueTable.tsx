
import { IssueStatusBadge } from '@/components';
import { Issue } from '@prisma/client';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import { IssueQuery } from '../page';
import TableHeader from './TableHeader';

type Props = {
  searchParams: IssueQuery;
  issues: Issue[]
}

const IssueTable = ({ issues, searchParams }: Props) => {
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          <TableHeader columns={columns} searchParams={searchParams} />
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
  )
}

export type ColumnsProps = { label: string; value: 'title' | 'status' | 'createdAt'; className?: string }[]
const columns: ColumnsProps = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];
export const columnNames = columns.map(column => column.value);

export default IssueTable