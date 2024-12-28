import { DevicesType } from '@/services/devices/devicesTypes'

import { inctagramApi } from '../inctagramApi'

const devicesApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    closeAllSessions: builder.mutation<unknown, void>({
      invalidatesTags: ['Sessions'],
      query: () => {
        return {
          credentials: 'include',
          method: 'DELETE',
          url: `/v1/sessions/other`,
        }
      },
    }),
    closeSession: builder.mutation<unknown, string>({
      invalidatesTags: ['Sessions'],
      query: deviceUuid => {
        return {
          credentials: 'include',
          method: 'DELETE',
          url: `/v1/sessions/${deviceUuid}`,
        }
      },
    }),
    getSessions: builder.query<DevicesType[], void>({
      providesTags: ['Sessions'],
      query: () => {
        return {
          credentials: 'include',
          method: 'GET',
          url: `/v1/sessions`,
        }
      },
      transformResponse: (rawData: unknown): DevicesType[] => {
        if (Array.isArray(rawData)) {
          const uniqueData = Array.from(
            new Map((rawData as DevicesType[]).map(item => [item.ip, item])).values()
          )

          return (uniqueData as DevicesType[]).reverse()
        }

        return []
      },
    }),
  }),
})

export const { useCloseAllSessionsMutation, useCloseSessionMutation, useGetSessionsQuery } =
  devicesApi
