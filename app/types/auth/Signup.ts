import { z } from 'zod'

export const SignupSchema = z.object({
  name: z.string().trim(),
  email: z.string().trim().email(),
  phone: z.coerce.string().trim().min(10).max(11),
  document: z.string().trim().min(11).max(14)
    .regex(/^[0-9]+$/),
  password: z.string().trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/),
  type_id: z.union([z.literal(1), z.literal(2)]),
})

export type Signup = z.infer<typeof SignupSchema>;
