'use client'

import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  const handleAssignIssue = async (status: Status) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        status: status,
      });
      router.refresh();
    } catch (error) {
      toast.error('Failed to assign user');
    }
  }

  const statuses: Statuses = [
    { label: 'Open', color: 'red', value: Status.OPEN },
    { label: 'In Progress', color: 'violet', value: Status.IN_PROGRESS },
    { label: 'Closed', color: 'green', value: Status.CLOSED },
  ]

  return (
    <>
      <Select.Root
        defaultValue={issue.status}
        onValueChange={handleAssignIssue}
      >
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            {statuses?.map(status => (
              <Select.Item
                key={status.value}
                color={status.color}
                value={status.value}
              >
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>

      </Select.Root>
      <Toaster />
    </>
  )
}

type Statuses = { label: string; color: string, value: Status }[]

export default AssigneeSelect