import { getIssueCounts } from '@/lib/dataService';
import { CalloutRoot, CalloutText, Flex, Grid } from '@radix-ui/themes';
import { Metadata } from 'next';
import IssueChart from './_components/IssueChart';
import IssueSummary from './_components/IssueSummary';
import LatestIssues from './_components/LatestIssues';

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export default async function Home() {
  const { open, closed, inProgress } = await getIssueCounts();

  return (
    <Flex direction='column' gap='5'>
      {DEMO_MODE && (
        <CalloutRoot color='amber'>
          <CalloutText>
            You are viewing a demo. Changes are not saved or persisted — this is for demonstration purposes only.
          </CalloutText>
        </CalloutRoot>
      )}

      <Grid columns={{ initial: '1', md: '2' }} gap='5'>
        <Flex direction='column' gap='5'>
          <IssueSummary open={open} closed={closed} inProgress={inProgress} />
          <IssueChart open={open} closed={closed} inProgress={inProgress} />
        </Flex>

        <LatestIssues />
      </Grid>
    </Flex>
  );
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues',
  keywords: ['issues', 'dashboard', 'vercel', 'nextjs', 'prisma', 'react', 'free'],
  creator: 'Nicodemos Santos',
};
