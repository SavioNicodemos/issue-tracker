'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';

const EMPTY_VALUE = 'empty';

const statuses: { label: string, value?: Status | typeof EMPTY_VALUE }[] = [
  { label: 'All', value: EMPTY_VALUE },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
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