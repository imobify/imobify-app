import * as yup from 'yup'
import parseDateString from '../../utils/parseDateString'

export const UserSchema = yup.object({
  id: yup.string().uuid().required(),
  createdAt: yup.date().transform(parseDateString).required(),
  updatedAt: yup.date().transform(parseDateString).required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().trim().required(),
  document: yup.string().required(),
  avatar_url: yup.string().url().required().nullable(),
  avatar_public_id: yup.string().required().nullable(),
  type_id: yup.number().oneOf([1, 2]).required(),
})

export type User = yup.InferType<typeof UserSchema>