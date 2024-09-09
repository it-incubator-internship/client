import { inctagramApi } from '@/services/inctagramApi'
import {
  ChangePasswordArgs,
  CheckEmailArgs,
  CheckEmailResponse,
  ResendEmailArgs,
  ResendEmailResponse,
} from '@/services/password-recovery/password-recovery-types'

const passwordRecovery = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    changePassword: builder.mutation<void, ChangePasswordArgs>({
      query: args => ({
        body: {
          code: args.code,
          newPassword: args.newPassword,
          passwordConfirmation: args.passwordConfirmation,
        },
        method: 'POST',
        url: '/v1/auth/new-password',
      }),
    }),
    checkEmail: builder.mutation<CheckEmailResponse, CheckEmailArgs>({
      query: args => ({
        body: { email: args.email, recaptchaToken: args.recaptchaToken },
        method: 'POST',
        url: '/v1/auth/password-recovery',
      }),
    }),
    resendEmail: builder.mutation<ResendEmailResponse, ResendEmailArgs>({
      query: args => ({
        body: { email: args.email },
        method: 'POST',
        url: '/v1/auth/password-recovery-email-resending',
      }),
    }),
  }),
})

export const { useChangePasswordMutation, useCheckEmailMutation, useResendEmailMutation } =
  passwordRecovery
