'use client'

import { Select } from '@radix-ui/themes'

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Assignee</Select.Label>
          <Select.Item value='1'>John Smith</Select.Item>
        </Select.Group>
      </Select.Content>

    </Select.Root>
  )
}

export default AssigneeSelect