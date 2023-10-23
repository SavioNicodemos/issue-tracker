import { Skeleton } from '@/components';
import { Box } from '@radix-ui/themes';

const IssueFormSkeleton = () => {
  return (
    <Box className='max-w-xl mb-5'>
      <Skeleton height='2rem' />
      <Skeleton height='23rem' />
    </Box >
  )
}

export default IssueFormSkeleton