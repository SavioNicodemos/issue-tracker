import authOptions from '@/auth/authOptions';
import { CalloutRoot, CalloutText, Flex, Heading } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import SignInButton from './SignInButton';

interface Props {
  searchParams: Promise<{ error?: string }>;
}

const SignInPage = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);
  if (session) redirect('/');

  const { error } = await searchParams;
  const isAccessDenied = error === 'AccessDenied';

  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  return (
    <Flex direction='column' align='center' justify='center' gap='5' className='min-h-[60vh]'>
      <AiFillBug size={40} />
      <Heading size='6'>Sign in to Issue Tracker</Heading>

      {isDemoMode && (
        <CalloutRoot color='blue' className='max-w-sm w-full'>
          <CalloutText>
            This is a demo version. Click below to log in and explore the app.
          </CalloutText>
        </CalloutRoot>
      )}

      {!isDemoMode && isAccessDenied && (
        <CalloutRoot color='red' className='max-w-sm w-full'>
          <CalloutText>
            For privacy and security reasons, only the system owner can log in to this system.
          </CalloutText>
        </CalloutRoot>
      )}

      <SignInButton />
    </Flex>
  );
};

export default SignInPage;
