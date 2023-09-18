import * as yup from 'yup'

export const signupFormSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('O campo nome é obrigatório!'),
  email: yup
    .string()
    .trim()
    .email('Email inválido.')
    .required('O campo email é obrigatório!'),
  phone: yup
    .string()
    .trim()
    .min(10, 'O telefone deve ter ao menos 10 dígitos.')
    .max(11, 'O telefone deve ter no máximo 11 dígitos.')
    .matches(/^[0-9]+$/, 'Digite apenas números!')
    .required('O campo telefone é obrigatório!'),
  document: yup
    .string()
    .trim()
    .min(11, 'Digite ao menos 11 dígitos para CPF.')
    .max(14, 'Digite no máximo 14 dígitos para CNPJ.')
    .matches(/^[0-9]+$/, 'Digite apenas números!')
    .required('O campo CPF/CNPJ é obrigatório!'),
  password: yup
    .string()
    .trim()
    .min(8, 'A senha deve possuir no mínimo 8 caracteres.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/, 'A senha deve possuir ao menos uma letra minúscula, maiúscula, e um número.')
    .required('O campo senha é obrigatório!'),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password')], 'As senhas não coincidem!')
    .required('Por favor, confirme sua senha.'),
})

export type SignupFormType = yup.InferType<typeof signupFormSchema>