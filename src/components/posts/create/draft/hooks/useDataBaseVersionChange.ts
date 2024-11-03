import { useEffect } from 'react'

import { draftDataConfig } from '@/components/posts/create/draft/consts/consts'
import { useTranslation } from '@/hooks/useTranslation'

export const useDataBaseVersionChange = () => {
  const channel = new BroadcastChannel('db_version_channel')
  const t = useTranslation()

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Add any logic to check data freshness here if needed
      }
    }

    channel.onmessage = (event: MessageEvent) => {
      if (event.data === draftDataConfig.versionChange && document.visibilityState !== 'visible') {
        alert(t.createPost.titleFromAlertChangeVersion)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      channel.close()
    }
  }, [channel])

  return { channel }
}
