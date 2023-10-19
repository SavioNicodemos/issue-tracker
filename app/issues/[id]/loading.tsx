import { Box, Flex, Card } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton width="20rem" height='1.2rem' />

      <Flex gap='3' my='2'>
        <Skeleton width="5rem" height='1.6rem' />
        <Skeleton width="8rem" height='1.6rem' />
      </Flex>
      <Card className='prose' mt='4'>
        <Skeleton count={5} />
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage