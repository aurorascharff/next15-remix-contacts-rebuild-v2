import { z } from 'zod';

export const contactSchema = z.object({
  avatar: z
    .string()
    .url()
    .startsWith('https://sessionize.com', 'Avatar URL must be from sessionize.com')
    .or(z.literal('')),
  first: z.string(),
  last: z.string(),
  notes: z.string(),
  twitter: z.string().startsWith('@', 'Twitter handle must start with @').or(z.literal('')),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;

export type ContactSchemaErrorType = z.inferFlattenedErrors<typeof contactSchema>;
