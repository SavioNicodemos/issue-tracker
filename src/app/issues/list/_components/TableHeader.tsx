'use client'

import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { Flex, Table } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { IssueQuery } from '../page';
import { ColumnsProps } from './IssueTable';

type Props = {
  columns: ColumnsProps;
  searchParams: IssueQuery;
}

type AllowedSortableColumns = 'title' | 'status' | 'createdAt';

const TableHeader = ({ columns, searchParams }: Props) => {
  const router = useRouter();

  const handleChangeSort = (column: AllowedSortableColumns) => {
    const params = new URLSearchParams(searchParams);
    if (column !== searchParams.orderBy) {
      params.set('orderBy', column);
      params.set('order', 'asc');
      return router.push(`/issues/list?${params.toString()}`);
    }

    const order = searchParams.order === 'asc' ? 'desc' : null;

    if (order) {
      params.set('order', order);
      return router.push(`/issues/list?${params.toString()}`);
    }

    params.delete('order');
    params.delete('orderBy');
    return router.push(`/issues/list${params.toString() ? `?${params.toString()}` : ''}`);
  }

  return (
    <>
      {columns.map((column) => {
        const isSortedColumn = column.value === searchParams.orderBy;
        return (
          <Table.ColumnHeaderCell
            key={column.value}
            className={`${column.className} cursor-pointer`}
            onClick={() => handleChangeSort(column.value)}
          >
            <Flex gap='2' align='center'>
              {column.label}
              {
                !isSortedColumn
                  ? null
                  : searchParams.order === 'asc'
                    ? <ArrowUpIcon className='inline' />
                    : <ArrowDownIcon className='inline' />
              }
            </Flex>
          </Table.ColumnHeaderCell>
        )
      })}
    </>
  )
}

export default TableHeader