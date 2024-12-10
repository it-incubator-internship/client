import { LocaleType } from '@/locales/ru'
import { z } from 'zod'

export const updateProfileSchema = (t: LocaleType) => {
  return z.object({
    aboutMe: z.string().max(200, { message: t.formErrors.noMoreThan200Characters }).optional(),
    city: z
      .string({ message: t.formErrors.required })
      .min(4, t.formErrors.required)
      .max(30, t.formErrors.required),
    country: z
      .string({ message: t.formErrors.required })
      .min(2, t.formErrors.required)
      .max(30, t.formErrors.required),
    dateOfBirth: z.date({ message: t.formErrors.required }),
    firstName: z
      .string({ message: t.formErrors.required })
      .min(1, t.formErrors.required)
      .max(50, { message: t.formErrors.firstnameNoMoreThan50Characters })
      .regex(/^[A-Za-zА-Яа-я]+$/, {
        message: t.formErrors.firstNameMustContainOnlyLettersAZaz,
      }),
    lastName: z
      .string({ message: t.formErrors.required })
      .min(1, t.formErrors.required)
      .max(50, { message: t.formErrors.lastnameNoMoreThan50Characters })
      .regex(/^[A-Za-zА-Яа-я]+$/, {
        message: t.formErrors.lastNameMustContainOnlyLettersAZaz,
      }),
    userName: z
      .string()
      .min(6, t.formErrors.minLength)
      .max(30, { message: t.formErrors.maxLength(30) })
      .regex(/^[a-zA-Z0-9_-]+$/, { message: t.formErrors.userName }),
  })
}

export type updateProfileFormValues = z.infer<ReturnType<typeof updateProfileSchema>>
