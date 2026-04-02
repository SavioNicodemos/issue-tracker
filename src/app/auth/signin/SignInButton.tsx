'use client';

import { Button } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';

const SignInButton = () => {
  return (
    <Button onClick={() => signIn('google')} size='3' className='cursor-pointer w-full'>
      Sign in with Google
    </Button>
  );
};

export default SignInButton;
