import { LocaleType } from '@/locales/ru'
import { z } from 'zod'

export const editPostSchema = (t: LocaleType) => {
  return z.object({
    titleFormEditPost: z
      .string()
      .max(500, { message: t.formErrors.maxLength(500) })
      .optional(),
  })
}

export type editPostFormValues = z.infer<ReturnType<typeof editPostSchema>>
