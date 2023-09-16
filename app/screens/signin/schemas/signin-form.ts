import * as yup from 'yup'

export const signinFormSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Email inválido.')
    .required('O campo email é obrigatório.'),
  password: yup
    .string()
    .trim()
    .min(8, 'A senha deve possuir no mínimo 8 caracteres.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/, 'A senha deve conter ao menos uma letra maiúscula e um número.')
    .required('O campo senha é obrigatório.')
})

export type SigninForm = yup.InferType<typeof signinFormSchema>