export function throttleBtn(throttleDuration: number, lastClickTime: number) {
  const currentTime = Date.now() / 1000

  if (currentTime - lastClickTime < throttleDuration) {
    return Math.ceil(throttleDuration - (currentTime - lastClickTime))
  }
}
