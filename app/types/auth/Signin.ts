import { z } from 'zod'

export const SigninSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/),
})

export type Signin = z.infer<typeof SigninSchema>;
