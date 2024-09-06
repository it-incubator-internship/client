import { inctagramApi } from '@/services/inctagramApi'

type ChangePasswordRequest = {
  code: string
  newPassword: string
  passwordConfirmation: string
}

const passwordRecovery = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    changePassword: builder.mutation<any, ChangePasswordRequest>({
      query: ({ code, newPassword, passwordConfirmation }) => ({
        body: { code, newPassword, passwordConfirmation },
        method: 'POST',
        url: '/v1/auth/new-password',
      }),
    }),
    checkEmail: builder.mutation<{ email: string }, { email: string; recaptchaToken: string }>({
      query: ({ email, recaptchaToken }) => ({
        body: { email, recaptchaToken },
        method: 'POST',
        url: '/v1/auth/password-recovery',
      }),
    }),
  }),
})

export const { useChangePasswordMutation, useCheckEmailMutation } = passwordRecovery
