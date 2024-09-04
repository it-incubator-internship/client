import { PropsWithChildren, useEffect } from 'react'

import Spinner from '@/components/Spinner/Spinner'
import { PATH, commonRoutes } from '@/consts/route-paths'
import { useMeQuery } from '@/services/auth/authApi'
import { useRouter } from 'next/router'

export function AuthProvider({ children }: PropsWithChildren) {
  const { data, isLoading } = useMeQuery()
  const router = useRouter()
  const remainingPath = router.pathname

  const isProtectedPage = !commonRoutes.includes(remainingPath)

  useEffect(() => {
    if (!isLoading && !data && isProtectedPage) {
      void router.push(PATH.LOGIN)

      return
    }
  }, [data, isProtectedPage, isLoading, router])

  if (isLoading) {
    return <Spinner />
  }

  if (!isLoading && !data && isProtectedPage) {
    return null
  }

  return <>{children}</>
}
