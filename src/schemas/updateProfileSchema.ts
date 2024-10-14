import { LocaleType } from '@/locales/ru'
import { z } from 'zod'

export const updateProfileSchema = (t: LocaleType) => {
  return z.object({
    aboutMe: z
      .string()
      .max(200, { message: 'This field about me must be no more than 200 characters' })
      .optional(),
    city: z
      .string({ message: 'This field is required' })
      .min(4, 'This field is required')
      .max(30, 'This field is required'),
    country: z
      .string({ message: 'This field is required' })
      .min(4, 'This field is required')
      .max(30, 'This field is required'),
    dateOfBirth: z.date({ message: 'This field is required' }),
    firstName: z
      .string({ message: 'This field is required' })
      .min(1, 'This field is required')
      .max(50, { message: 'This field firstname must be no more than 50 characters' })
      .regex(/^[A-Za-zА-Яа-я]+$/, {
        message: 'First name must contain only letters A-Z, a-z, А-Я, а-я',
      }),
    lastName: z
      .string({ message: 'This field is required' })
      .min(1, 'This field is required')
      .max(50, { message: 'This field lastname must be no more than 50 characters' })
      .regex(/^[A-Za-zА-Яа-я]+$/, {
        message: 'Last name must contain only letters A-Z, a-z, А-Я, а-я',
      }),
    userName: z
      .string({ message: 'This field is required' })
      .min(6, 'This field is required')
      .max(30),
  })
}

export type updateProfileFormValues = z.infer<ReturnType<typeof updateProfileSchema>>
