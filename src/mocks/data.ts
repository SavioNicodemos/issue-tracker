import { Issue, User } from '@prisma/client';

export const MOCK_USERS: User[] = [
  {
    id: 'mock-user-1',
    name: 'Alice Johnson',
    email: 'alice@demo.com',
    emailVerified: null,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
  },
  {
    id: 'mock-user-2',
    name: 'Bob Smith',
    email: 'bob@demo.com',
    emailVerified: null,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
  },
  {
    id: 'mock-user-3',
    name: 'Carol Davis',
    email: 'carol@demo.com',
    emailVerified: null,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
  },
];

export const MOCK_ISSUES: Issue[] = [
  {
    id: 1,
    title: 'Login page causes redirect loop',
    description:
      '## Bug Description\n\nUsers are being caught in a redirect loop on the login page after submitting valid credentials.\n\n## Steps to Reproduce\n\n1. Navigate to `/login`\n2. Enter valid credentials\n3. Submit the form\n4. Observe the infinite redirect\n\n## Expected Behavior\n\nUser should be redirected to the dashboard.',
    status: 'OPEN',
    assignedToUserId: null,
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
  },
  {
    id: 2,
    title: 'Dashboard chart broken for new accounts',
    description:
      '## Bug Description\n\nNew user accounts show an empty dashboard with broken chart components.\n\n## Root Cause\n\nThe chart expects at least one data point. When there are no issues, it throws an error instead of showing an empty state.',
    status: 'IN_PROGRESS',
    assignedToUserId: 'mock-user-1',
    createdAt: new Date('2024-01-18T14:30:00Z'),
    updatedAt: new Date('2024-01-20T09:00:00Z'),
  },
  {
    id: 3,
    title: 'Implement dark mode toggle',
    description:
      '## Feature Request\n\nAdd a dark mode toggle to the app header.\n\n### Acceptance Criteria\n\n- Persists user preference in localStorage\n- Supports system preference detection\n- Applies to all pages and components',
    status: 'OPEN',
    assignedToUserId: null,
    createdAt: new Date('2024-01-20T08:00:00Z'),
    updatedAt: new Date('2024-01-20T08:00:00Z'),
  },
  {
    id: 4,
    title: 'Pagination resets needed on filter change',
    description:
      '## Bug Description\n\nWhen filtering issues by status, if the user is on page 2 and changes the filter, the pagination does not reset to page 1. This causes an empty page or stale results.',
    status: 'IN_PROGRESS',
    assignedToUserId: 'mock-user-2',
    createdAt: new Date('2024-01-22T11:00:00Z'),
    updatedAt: new Date('2024-01-23T16:00:00Z'),
  },
  {
    id: 5,
    title: 'Export issue list to CSV',
    description:
      '## Feature Request\n\nUsers should be able to export the current issue list to a CSV file.\n\n### Acceptance Criteria\n\n- Export button in the issue list header\n- Exports all columns: id, title, status, assignee, created date\n- Respects current filters and sort order',
    status: 'OPEN',
    assignedToUserId: 'mock-user-3',
    createdAt: new Date('2024-01-24T09:00:00Z'),
    updatedAt: new Date('2024-01-24T09:00:00Z'),
  },
  {
    id: 6,
    title: 'Markdown code blocks missing syntax highlighting',
    description:
      '## Bug Description\n\nCode blocks in issue descriptions are not syntax-highlighted. The markdown renderer is missing the syntax highlighting plugin.',
    status: 'CLOSED',
    assignedToUserId: 'mock-user-1',
    createdAt: new Date('2024-01-10T08:00:00Z'),
    updatedAt: new Date('2024-01-14T17:00:00Z'),
  },
  {
    id: 7,
    title: 'Increase API rate limit for authenticated users',
    description:
      '## Feature Request\n\nAuthenticated users should have a higher API rate limit than anonymous users. Current limit is 60 req/min for everyone.\n\nPropose: 200 req/min for authenticated users.',
    status: 'CLOSED',
    assignedToUserId: 'mock-user-2',
    createdAt: new Date('2024-01-05T10:00:00Z'),
    updatedAt: new Date('2024-01-12T15:00:00Z'),
  },
  {
    id: 8,
    title: 'Mobile layout overflows on small screens',
    description:
      '## Bug Description\n\nThe issue table overflows its container on screens narrower than 375px. Horizontal scroll is not properly contained within the card.',
    status: 'IN_PROGRESS',
    assignedToUserId: 'mock-user-3',
    createdAt: new Date('2024-01-25T13:00:00Z'),
    updatedAt: new Date('2024-01-26T09:00:00Z'),
  },
];

export type IssueWithUser = Issue & { assignedToUser: User | null };

export const MOCK_ISSUES_WITH_USERS: IssueWithUser[] = MOCK_ISSUES.map(issue => ({
  ...issue,
  assignedToUser: issue.assignedToUserId
    ? (MOCK_USERS.find(u => u.id === issue.assignedToUserId) ?? null)
    : null,
}));
