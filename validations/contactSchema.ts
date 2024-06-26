import { z } from 'zod';

export const contactSchema = z.object({
  avatar: z
    .string()
    .url()
    .startsWith('https://sessionize.com', 'Avatar URL must be from sessionize.com')
    .or(z.literal(''))
    .nullable(),
  first: z.string().nullable(),
  last: z.string().nullable(),
  notes: z.string().nullable(),
  twitter: z.string().nullable(),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;

export type ContactSchemaErrorType = z.inferFlattenedErrors<typeof contactSchema>;
