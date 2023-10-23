'use client'

import { Spinner } from "@/components"
import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteIssue() {
    try {
      setIsDeleting(true);

      await axios.delete(`/api/issues/${issueId}`)

      router.push('/issues/list')
      router.refresh()
    } catch (error) {
      setError(true);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            color='red'
            disabled={isDeleting}
          >
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>

          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be undone.
          </AlertDialog.Description>

          <Flex mt='4' gap='3'>
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button onClick={handleDeleteIssue} variant="soft" color="red">Delete Issue</Button>
            </AlertDialog.Action>
          </Flex>

        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>

          <AlertDialog.Description>
            An error occurred while deleting the issue.
          </AlertDialog.Description>

          <AlertDialog.Cancel>
            <Button
              mt='4'
              variant="soft"
              color="gray"
              onClick={() => setError(false)}
            >
              OK
            </Button>
          </AlertDialog.Cancel>

        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton