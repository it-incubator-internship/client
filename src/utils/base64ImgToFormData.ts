export const base64ImgToFormData = (base64String: string) => {
  const formData = new FormData()
  const [metadata, base64Data] = base64String.split(',')
  // @ts-ignore
  const mimeType = metadata.match(/:(.*?);/)[1]

  const byteCharacters = atob(base64Data)
  const byteNumbers = new Uint8Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }

  const blob = new Blob([byteNumbers], { type: mimeType })

  formData.append('file', blob, 'image.png')

  return formData
}
