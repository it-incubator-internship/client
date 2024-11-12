import { LocaleType } from '@/locales/ru'
import { z } from 'zod'
export const forgotPasswordRecaptchaFormSchema = (t: LocaleType) =>
  z.object({
    email: z
      .string({ message: t.formErrors.required })
      .email({ message: t.formErrors.notValidEmail }),
  })
