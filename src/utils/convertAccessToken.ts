export const convertAccessToken = async (accessToken: string) => {
  const tokenPayload = accessToken.split('.')?.[1]
  let parserPayload

  try {
    const decoderPayload = atob(tokenPayload)

    parserPayload = JSON.parse(decoderPayload)
  } catch {
    parserPayload = {}
  }

  return await parserPayload
}
