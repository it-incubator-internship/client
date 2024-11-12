import { LocaleType } from '@/locales/ru'
import { z } from 'zod'
export const createNewPasswordFormSchema = (t: LocaleType) =>
  z
    .object({
      confirmPassword: z
        .string()
        .min(6, t.createNewPassword.newPasswordForm.errors.passwordMinCharacters)
        .max(20, t.createNewPassword.newPasswordForm.errors.passwordMaxCharacters),
      newPassword: z
        .string()
        .min(6, t.createNewPassword.newPasswordForm.errors.passwordMinCharacters)
        .max(20, t.createNewPassword.newPasswordForm.errors.passwordMaxCharacters),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
      message: t.createNewPassword.newPasswordForm.errors.passwordsMustMatch,
      path: ['confirmPassword'],
    })
