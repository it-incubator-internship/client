import { PropsWithChildren, useEffect } from 'react'

import { useMeQuery } from '@/services/auth/authApi'
import { useRouter } from 'next/router'

import Spinner from '../Spinner/Spinner'

export function AuthProvider({ children }: PropsWithChildren) {
  const { isError, isLoading } = useMeQuery()
  const router = useRouter()

  useEffect(() => {
    if (!isError) {
      return
    }
    void router.push('/login')
  }, [isError, router])

  if (isLoading) {
    return <Spinner />
  }

  return <>{children}</>
}
