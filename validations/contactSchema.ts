import { z } from 'zod';

export const contactSchema = z.object({
  avatar: z
    .string()
    .url()
    .startsWith('https://sessionize.com', 'Avatar URL must be from sessionize.com')
    .or(z.literal(''))
    .optional(),
  favorite: z.boolean().optional(),
  first: z.string().optional(),
  last: z.string().optional(),
  notes: z.string().optional(),
  twitter: z.string().startsWith('@', 'Twitter handle must start with @').or(z.literal('')).optional(),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;

export type ContactSchemaErrorType = z.inferFlattenedErrors<typeof contactSchema>;
