import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, 'The title field is required.')
    .max(255, 'The text should be less than 255 characters.'),
  description: z
    .string()
    .min(1, 'The description field is required.')
    .max(60000, 'The text should be less than 60.000 characters.'),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, 'The title field is required.')
    .max(255, 'The text should be less than 255 characters.')
    .optional(),
  description: z
    .string()
    .min(1, 'The description field is required.')
    .max(60000, 'The text should be less than 60.000 characters.')
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, 'The assignedToUserId field is required.')
    .max(255, 'The text should be less than 255 characters.')
    .optional()
    .nullable(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']).optional(),
});
