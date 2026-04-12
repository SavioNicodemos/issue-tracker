import authOptions from '@/auth/authOptions';
import { getIssue } from '@/lib/dataService';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import AssigneeSelect from './_components/AssigneeSelect';
import DeleteIssueButton from './_components/DeleteIssueButton';
import EditIssueButton from './_components/EditIssueButton';
import IssueDetails from './_components/IssueDetails';
import StatusSelect from './_components/StatusSelect';

type Props = {
  params: Promise<{ id: string }>;
};

const fetchIssue = cache((id: number) => getIssue(id));

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  if (isNaN(parseInt(id))) return notFound();

  const session = await getServerSession(authOptions);
  const issue = await fetchIssue(parseInt(id));

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>

      {session && (
        <Box>
          <Flex direction='column' gap='4'>
            <AssigneeSelect issue={issue} />
            <StatusSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchIssue(parseInt(id));
  return { title: issue?.title, description: issue?.description };
}

export default IssueDetailPage;
