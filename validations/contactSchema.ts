import { z } from 'zod';

export const contactSchema = z.object({
  avatar: z.string().url().or(z.literal('')).nullable(),
  first: z.string().nullable(),
  last: z.string().nullable(),
  notes: z.string().nullable(),
  twitter: z.string().nullable(),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;

export type ContactSchemaErrorType = z.inferFlattenedErrors<typeof contactSchema>;
