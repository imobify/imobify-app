import { z } from 'zod'

export const authResponseSchema = z.object({
  access_token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().trim(),
  email: z.string().trim().email(),
  phone: z.coerce.string().trim().min(10).max(11),
  document: z.string().trim().min(11).max(14).regex(/^[0-9]+$/),
  password: z.string().trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/),
  type_id: z.union([z.literal(1), z.literal(2)]),
  avatar_url: z.string().nullable(),
  avatar_public_id: z.string().nullable(),
})

export type AuthResponse = z.infer<typeof authResponseSchema>;