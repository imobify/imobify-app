import * as yup from 'yup'

export const signupFormSchema = yup.object({
  name: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  phone: yup.string().trim().min(10).max(11).matches(/^[0-9]+$/).required(),
  document: yup.string().trim().min(11).max(14).matches(/^[0-9]+$/).required(),
  password: yup.string().trim().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/).required(),
  confirmPassword: yup.string().trim().oneOf([yup.ref('password')]).required(),
})

export type SignupForm = yup.InferType<typeof signupFormSchema>