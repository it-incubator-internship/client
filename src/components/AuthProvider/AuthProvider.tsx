import { PropsWithChildren, useEffect } from 'react'

import Spinner from '@/components/Spinner/Spinner'
import { PATH, commonRoutes } from '@/consts/route-paths'
import { useMeQuery } from '@/services/auth/authApi'
import { isInitialized } from '@/services/slices/slice'
import { useAppDispatch } from '@/services/store'
import { useRouter } from 'next/router'

export function AuthProvider({ children }: PropsWithChildren) {
  const { data, isLoading } = useMeQuery()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const remainingPath = router.pathname

  const isProtectedPage = !commonRoutes.includes(remainingPath)

  useEffect(() => {
    if (!isLoading && !data && isProtectedPage) {
      router.replace(PATH.LOGIN)
      dispatch(isInitialized())

      return
    }
    dispatch(isInitialized())
  }, [data, isProtectedPage, isLoading, router])

  if (isProtectedPage) {
    return <Spinner />
  }

  return <>{children}</>
}
