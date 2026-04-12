'use client';

import { Button } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

const SignInButton = () => {
  if (isDemoMode) {
    return (
      <Button
        onClick={() => signIn('demo', { callbackUrl: '/' })}
        size='3'
        className='cursor-pointer w-full'
      >
        Sign in as Demo User
      </Button>
    );
  }

  return (
    <Button onClick={() => signIn('google')} size='3' className='cursor-pointer w-full'>
      Sign in with Google
    </Button>
  );
};

export default SignInButton;
