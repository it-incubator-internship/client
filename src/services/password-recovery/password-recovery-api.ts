import { inctagramApi } from '@/services/inctagramApi'

const passwordRecovery = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    checkEmail: builder.query<{ email: string }, { email: string; recaptchaToken: string }>({
      query: ({ email, recaptchaToken }) => ({
        body: { email, recaptchaToken },
        method: 'POST',
        url: '/v1/auth/password-recovery',
      }),
    }),
  }),
})

export const { useCheckEmailQuery } = passwordRecovery
