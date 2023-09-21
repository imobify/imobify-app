import * as yup from 'yup'

export const signupSchema = yup.object({
  name: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  phone: yup.string().trim().min(10).max(11).matches(/^[0-9]+$/).required(),
  document: yup.string().trim().min(11).max(14).matches(/^[0-9]+$/).required(),
  password: yup.string().trim().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/).required(),
  confirmPassword: yup.string().trim().oneOf([yup.ref('password')]).required(),
  type_id: yup.number().min(1).max(2).required(),
})

export type Signup = yup.InferType<typeof signupSchema>
