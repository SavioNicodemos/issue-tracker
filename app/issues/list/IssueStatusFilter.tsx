'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const EMPTY_VALUE = 'empty';
type FilterTypes = Status | typeof EMPTY_VALUE

const statuses: { label: string, value?: FilterTypes }[] = [
  { label: 'All', value: EMPTY_VALUE },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  const router = useRouter();

  const handleFilterSelect = (status: FilterTypes) => {
    const query = (!status || status === EMPTY_VALUE) ? '' : `?status=${status}`;
    router.push(`/issues/list${query}`);
  }

  return (
    <Select.Root onValueChange={handleFilterSelect}>
      <Select.Trigger placeholder='Filter by status...' />
      <Select.Content>
        {statuses.map(status => (
          <Select.Item key={status.value} value={status.value || EMPTY_VALUE}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter