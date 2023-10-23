import { Status } from '@prisma/client';
import { Card, Flex, Heading } from '@radix-ui/themes';
import Link from 'next/link';

type Statuses = {
  label: string;
  value: number;
  status: Status;
}

type Props = {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ closed, inProgress, open }: Props) => {
  const containers: Statuses[] = [
    { label: 'Open issues', value: open, status: 'OPEN' },
    { label: 'In progress issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed issues', value: closed, status: 'CLOSED' },
  ];

  return (
    <Flex gap='4'>
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction='column' gap='1'>
            <Link className='text-sm font-medium' href={`/issues/list?status=${container.status}`}>
              {container.label}
            </Link>
            <Heading size='5'>{container.value}</Heading>
          </Flex>
        </Card>
      ))}
    </Flex>
  )
}

export default IssueSummary