import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, 'The title field is required.')
    .max(255, 'The text should be less than 255 characters.'),
  description: z.string().min(1, 'The description field is required.'),
});
