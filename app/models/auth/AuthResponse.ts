import * as yup from 'yup'
import parseDateString from '../../utils/parseDateString'

export const authResponseSchema = yup.object({
  id: yup.string().uuid().trim().required(),
  access_token: yup.string().trim().required(),
  createdAt: yup.date().transform(parseDateString).required(),
  updatedAt: yup.date().transform(parseDateString).required(),
  name: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  phone: yup.string().trim().required(),
  document: yup.string().trim().min(11).max(14).matches(/^[0-9]+$/).required(),
  type_id: yup.number().min(1).max(2).required(),
  avatar_url: yup.string().url().nullable(),
  avatar_public_id: yup.string().nullable(),
})

export type AuthResponse = yup.InferType<typeof authResponseSchema>