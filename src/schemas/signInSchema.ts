import { LocaleType } from '@/locales/ru'
import { z } from 'zod'
export const signInSchema = (t: LocaleType) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t.formErrors.required })
      .email({ message: t.formErrors.invalidEmail }),
    password: z.string().min(1, { message: t.formErrors.required }),
  })
