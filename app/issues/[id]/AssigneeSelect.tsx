'use client'

import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const EMPTY_VALUE = 'empty';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users').then(res => res.data),
    staleTime: 60 * 1000, // 60 seconds
    retry: 3,
  })

  const handleAssignUser = (userId: string) => {
    if (userId === EMPTY_VALUE) userId = '';
    axios.patch(`/api/issues/${issue.id}`, {
      assignedToUserId: userId || null
    });
  }

  if (isLoading) return <Skeleton />

  if (error) return null;

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || EMPTY_VALUE}
      onValueChange={handleAssignUser}
    >
      <Select.Trigger placeholder='Assign...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value={EMPTY_VALUE}>Unassigned</Select.Item>
          {users?.map(user => (
            <Select.Item
              key={user.id}
              value={user.id}
            >
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>

    </Select.Root>
  )
}

export default AssigneeSelect