'use client'

import { ErrorMessage, Spinner } from '@/components'
import { createIssueSchema } from '@/schemas/issues'
import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'
import { z } from 'zod'

type IssueFormData = z.infer<typeof createIssueSchema>

type Props = {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: issue?.title ?? '',
      description: issue?.description ?? '',
    },
  });
  const router = useRouter();

  const [generalError, setGeneralError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function handleCreateIssue(data: IssueFormData) {
    try {
      setIsSubmitting(true);

      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post('/api/issues', data);

      router.push('/issues/list');
      router.refresh();
    } catch (error) {
      setGeneralError('An unexpected error occurred.')
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='max-w-xl mb-5'>
      {generalError && (
        <Callout.Root color='red'>
          <Callout.Text>{generalError}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className='space-y-3'
        onSubmit={handleSubmit(handleCreateIssue)}
      >
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'}&nbsp;
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div >
  )
}

export default IssueForm