export const convertDeviceData = (data: string) => {
  let deviceType
  let browser

  if (data.includes('Windows')) {
    deviceType = 'desktop'
  } else {
    deviceType = 'mobile'
  }

  if (data.includes('Chrome')) {
    browser = 'Chrome'
  } else if (data.includes('Firefox')) {
    browser = 'Firefox'
  } else if (data.includes('Safari')) {
    browser = 'Safari'
  } else {
    browser = ''
  }

  return {
    browser,
    deviceType,
  }
}
