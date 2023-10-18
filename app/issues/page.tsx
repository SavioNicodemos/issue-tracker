import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const IssuesPage = () => {
  return (
    <Link href='/issues/new'>
      <Button>New Issue</Button>
    </Link>
  )
}

export default IssuesPage