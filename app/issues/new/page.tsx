'use client'

import React, { useState } from 'react'
import { Button, Callout } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useForm, Controller } from 'react-hook-form'
import { TextField } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchemas'
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });
  const router = useRouter();

  const [generalError, setGeneralError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function handleCreateIssue(data: IssueForm) {
    try {
      setIsSubmitting(true);
      const response = await axios.post('/api/issues', data);

      router.push('/issues');
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

        <Button disabled={isSubmitting}> Submit New Issue {isSubmitting && <Spinner />}</Button>
      </form>
    </div >
  )
}

export default NewIssuePage