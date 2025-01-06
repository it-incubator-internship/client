import { LocaleType } from '@/locales/ru'
import { z } from 'zod'

export const accountManagementSchema = (t: LocaleType) => {
  return z.object({
    titleFormEditPost: z.string().optional(),
  })
}

export type editPostFormValues = z.infer<ReturnType<typeof accountManagementSchema>>
