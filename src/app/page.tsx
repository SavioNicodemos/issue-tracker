import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./_components/IssueChart";
import IssueSummary from "./_components/IssueSummary";
import LatestIssues from "./_components/LatestIssues";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5' >
      <Flex direction='column' gap='5'>
        <IssueSummary open={open} closed={closed} inProgress={inProgress} />
        <IssueChart open={open} closed={closed} inProgress={inProgress} />
      </Flex>

      <LatestIssues />
    </Grid>
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues',
  keywords: ['issues', 'dashboard', 'vercel', 'nextjs', 'prisma', 'react', 'free'],
  creator: 'Nicodemos Santos',
}
