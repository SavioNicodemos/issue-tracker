'use client'

import React, { useState } from 'react'
import { Button, Callout } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useForm, Controller } from 'react-hook-form'
import { TextField } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type IssueForm = {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  const [error, setError] = useState<string>();

  async function handleCreateIssue(data: IssueForm) {
    try {
      const response = await axios.post('/api/issues', data);
      console.log(response.data);

      router.push('/issues');
    } catch (error) {
      setError('An unexpected error occurred.')
    }
  }

  return (
    <div className='max-w-xl mb-5'>
      {error && (
        <Callout.Root color='red'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className='space-y-3'
        onSubmit={handleSubmit(handleCreateIssue)}
      >
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>

        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />

        <Button> Submit New Issue</Button>
      </form>
    </div >
  )
}

export default NewIssuePage