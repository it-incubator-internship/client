const fetchUserIpAndStore = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const result = await response.json()

    sessionStorage.setItem('clientIp', result.ip)
  } catch (error) {
    console.error('Error fetching IP:', error)
  }
}

export default fetchUserIpAndStore
