/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as yup from 'yup'

export const editUserSchema = yup.object({
  name: yup
    .string()
    .optional()
    .transform(value => value === '' ? undefined : value)
    .trim(),
  email: yup
    .string()
    .optional()
    .transform(value => value === '' ? undefined : value)
    .trim()
    .email('Email inválido.'),
  phone: yup
    .string()
    .optional()
    .transform(value => value === '' ? undefined : value)
    .trim()
    .min(10, 'O telefone deve ter ao menos 10 dígitos.')
    .max(11, 'O telefone deve ter no máximo 11 dígitos.')
    .matches(/^[0-9]+$/, 'Digite apenas números!'),
  document: yup
    .string()
    .optional()
    .transform(value => value === '' ? undefined : value)
    .trim()
    .min(11, 'Digite ao menos 11 dígitos para CPF.')
    .max(14, 'Digite no máximo 14 dígitos para CNPJ.')
    .matches(/^[0-9]+$/, 'Digite apenas números!'),
  password: yup
    .string()
    .optional()
    .transform(value => value === '' ? undefined : value)
    .trim()
    .min(8, 'A senha deve possuir no mínimo 8 caracteres.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/, 'A senha deve possuir ao menos uma letra minúscula, maiúscula, e um número.'),
  confirmPassword: yup
    .string()
    .optional()
    .transform(value => value === '' ? undefined : value)
    .trim()
    .oneOf([yup.ref('password')], 'As senhas não coincidem!'),
})

export type EditUserType = yup.InferType<typeof editUserSchema>