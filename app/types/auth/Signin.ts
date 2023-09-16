import * as yup from 'yup'

export const signinSchema = yup.object({
  email: yup.string().trim().email().required(),
  password: yup.string().trim().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/).required(),
})

export type Signin = yup.InferType<typeof signinSchema>
