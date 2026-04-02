import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';

const NotFound = () => {
  return (
    <Flex direction='column' align='center' justify='center' gap='3' className='min-h-[60vh]'>
      <Heading size='8'>404</Heading>
      <Heading size='5'>Page not found</Heading>
      <Text color='gray'>The page you are looking for does not exist.</Text>
      <Button asChild>
        <Link href='/'>Go to Dashboard</Link>
      </Button>
    </Flex>
  );
};

export default NotFound;
