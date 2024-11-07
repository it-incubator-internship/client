export const convertBlobToFile = (blob: Blob, fileName: string): File => {
  // Создаем объект File из Blob
  return new File([blob], fileName, { lastModified: Date.now(), type: blob.type })
}

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      // Приводим результат к типу string
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Failed to convert file to base64 string'))
      }
    }
    reader.onerror = error => reject(error)
    reader.readAsDataURL(file)
  })
}
