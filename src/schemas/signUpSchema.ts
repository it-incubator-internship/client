import { LocaleType } from '@/locales/ru'
import { z } from 'zod'

export const signUpSchema = (t: LocaleType) => {
  return z
    .object({
      email: z.string().min(1, { message: t.formErrors.required }).email(t.formErrors.email),
      isAgreement: z.boolean(),
      password: z
        .string({ message: t.formErrors.required })
        .min(6, t.formErrors.minLength)
        .max(20, t.formErrors.maxLength(20))
        .regex(/^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/g, t.formErrors.passwordRegex),
      passwordConfirmation: z.string().min(1, { message: t.formErrors.required }),
      userName: z
        .string()
        .min(6, t.formErrors.minLength)
        .max(30, { message: t.formErrors.maxLength(30) })
        .regex(/^[a-zA-Z0-9_-]+$/, { message: t.formErrors.userName }),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      message: t.formErrors.passwordMatch,
      path: ['passwordConfirmation'],
    })
    .superRefine((data, ctx) => {
      if (!data.isAgreement) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t.formErrors.termsAgreement,
          path: ['isAgreement'],
        })
      }
    })
}

export type signUpFormValues = z.infer<ReturnType<typeof signUpSchema>>
