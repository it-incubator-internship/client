import { LocaleType } from '@/locales/ru'
import { z } from 'zod'

export const accountManagementSchema = (t: LocaleType) => {
  return z.object({
    accountType: z
      .string({ message: t.myProfileSettings.accountManagementPayment.errorSelected })
      .optional(),
    autoRenewal: z.boolean().optional(),
    subscriptionType: z.string({
      message: t.myProfileSettings.accountManagementPayment.errorSelected,
    }),
  })
}

export type accountTypeFormValues = z.infer<ReturnType<typeof accountManagementSchema>>
