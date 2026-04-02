import authOptions from '@/auth/authOptions';
import { Callout, Flex, Heading } from '@radix-ui/themes';
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

  return (
    <Flex direction='column' align='center' justify='center' gap='5' className='min-h-[60vh]'>
      <AiFillBug size={40} />
      <Heading size='6'>Sign in to Issue Tracker</Heading>

      {isAccessDenied && (
        <Callout.Root color='red' className='max-w-sm w-full'>
          <Callout.Text>
            For privacy and security reasons, only the system owner can log in to this system.
          </Callout.Text>
        </Callout.Root>
      )}

      <SignInButton />
    </Flex>
  );
};

export default SignInPage;
