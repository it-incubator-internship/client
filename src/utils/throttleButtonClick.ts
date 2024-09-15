import { useState } from 'react'

export function useThrottle(throttleTime: number) {
  const [lastClickTime, setLastClickTime] = useState(0)

  const throttled = () => {
    const currentTime = Date.now() / 1000

    if (currentTime - lastClickTime <= throttleTime) {
      return throttleTime - (currentTime - lastClickTime)
    }
    setLastClickTime(currentTime)

    return null
  }

  return { throttled }
}
