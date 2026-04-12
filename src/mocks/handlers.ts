import { http, HttpResponse } from 'msw';
import { MOCK_ISSUES, MOCK_USERS } from './data';

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json(MOCK_USERS);
  }),

  http.post('/api/issues', async ({ request }) => {
    const body = (await request.json()) as { title: string; description: string };
    const newIssue = {
      id: Date.now(),
      title: body.title,
      description: body.description,
      status: 'OPEN',
      assignedToUserId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return HttpResponse.json(newIssue, { status: 201 });
  }),

  http.patch('/api/issues/:id', async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const issue = MOCK_ISSUES.find(i => i.id === Number(params.id)) ?? MOCK_ISSUES[0];
    return HttpResponse.json({
      ...issue,
      ...body,
      updatedAt: new Date().toISOString(),
    });
  }),

  http.delete('/api/issues/:id', () => {
    return HttpResponse.json({ message: 'Issue deleted' });
  }),
];
