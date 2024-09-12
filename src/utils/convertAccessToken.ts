export const convertAccessToken = async (accessToken: string | string[] | undefined) => {
  let parserPayload

  if (typeof accessToken === 'string') {
    const tokenPayload = accessToken.split('.')?.[1]

    try {
      const decoderPayload = atob(tokenPayload)

      parserPayload = JSON.parse(decoderPayload)
    } catch {
      parserPayload = {}
    }
  }

  return await parserPayload
}
