import { MOCK_ISSUES, MOCK_ISSUES_WITH_USERS, MOCK_USERS, IssueWithUser } from '@/mocks/data';
import prisma from '@/prisma/client';
import { Issue, User } from '@prisma/client';

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

// ─── Queries ────────────────────────────────────────────────────────────────

export async function getIssueCounts() {
  if (DEMO_MODE) {
    return {
      open: MOCK_ISSUES.filter(i => i.status === 'OPEN').length,
      closed: MOCK_ISSUES.filter(i => i.status === 'CLOSED').length,
      inProgress: MOCK_ISSUES.filter(i => i.status === 'IN_PROGRESS').length,
    };
  }
  const [open, closed, inProgress] = await Promise.all([
    prisma.issue.count({ where: { status: 'OPEN' } }),
    prisma.issue.count({ where: { status: 'CLOSED' } }),
    prisma.issue.count({ where: { status: 'IN_PROGRESS' } }),
  ]);
  return { open, closed, inProgress };
}

export async function getIssues({
  status,
  orderBy,
  page = 1,
  pageSize = 10,
}: {
  status?: string;
  orderBy?: Record<string, 'asc' | 'desc'>;
  page?: number;
  pageSize?: number;
} = {}): Promise<{ issues: Issue[]; count: number }> {
  if (DEMO_MODE) {
    const filtered = status ? MOCK_ISSUES.filter(i => i.status === status) : MOCK_ISSUES;
    const sorted = orderBy
      ? [...filtered].sort((a, b) => {
          const key = Object.keys(orderBy)[0] as keyof Issue;
          const dir = Object.values(orderBy)[0];
          return dir === 'asc'
            ? String(a[key]).localeCompare(String(b[key]))
            : String(b[key]).localeCompare(String(a[key]));
        })
      : filtered;
    return {
      issues: sorted.slice((page - 1) * pageSize, page * pageSize),
      count: filtered.length,
    };
  }
  const where = status ? { status } : {};
  const [issues, count] = await Promise.all([
    prisma.issue.findMany({ where, orderBy, skip: (page - 1) * pageSize, take: pageSize }),
    prisma.issue.count({ where }),
  ]);
  return { issues, count };
}

export async function getIssue(id: number): Promise<Issue | null> {
  if (DEMO_MODE) return MOCK_ISSUES.find(i => i.id === id) ?? null;
  return prisma.issue.findUnique({ where: { id } });
}

export async function getLatestIssues(take = 5): Promise<IssueWithUser[]> {
  if (DEMO_MODE) return MOCK_ISSUES_WITH_USERS.slice(0, take);
  return prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take,
    include: { assignedToUser: true },
  });
}

export async function getUsers(): Promise<User[]> {
  if (DEMO_MODE) return MOCK_USERS;
  return prisma.user.findMany({ orderBy: { name: 'asc' } });
}

export async function getUser(id: string): Promise<User | null> {
  if (DEMO_MODE) return MOCK_USERS.find(u => u.id === id) ?? null;
  return prisma.user.findUnique({ where: { id } });
}

// ─── Mutations ───────────────────────────────────────────────────────────────

export async function createIssue(data: {
  title: string;
  description: string;
}): Promise<Issue> {
  if (DEMO_MODE) {
    return {
      id: Date.now(),
      ...data,
      status: 'OPEN',
      assignedToUserId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
  return prisma.issue.create({ data });
}

export async function patchIssue(
  id: number,
  data: {
    title?: string;
    description?: string;
    status?: string;
    assignedToUserId?: string | null;
  }
): Promise<Issue | null> {
  if (DEMO_MODE) {
    const issue = MOCK_ISSUES.find(i => i.id === id) ?? MOCK_ISSUES[0];
    return { ...issue, ...data, updatedAt: new Date() };
  }
  const current = await prisma.issue.findUnique({ where: { id } });
  if (!current) return null;

  const status =
    data.assignedToUserId && current.status === 'OPEN' && !current.assignedToUserId
      ? 'IN_PROGRESS'
      : data.status;

  return prisma.issue.update({ where: { id }, data: { ...data, status } });
}

export async function removeIssue(id: number): Promise<boolean> {
  if (DEMO_MODE) return true;
  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) return false;
  await prisma.issue.delete({ where: { id } });
  return true;
}
