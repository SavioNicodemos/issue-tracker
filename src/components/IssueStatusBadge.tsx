import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes';
import React from 'react'

type Props = {
  status: Status;
}

type AcceptedColors = 'red' | 'violet' | 'green';

const statusMap: Record<Status, { label: string; color: AcceptedColors; }> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' },
}

const IssueStatusBadge = ({ status: selectedStatus }: Props) => {
  const status = statusMap[selectedStatus];
  return (
    <Badge color={status.color}>{status.label}</Badge>
  )
}

export default IssueStatusBadge