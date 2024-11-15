import { ImageType } from '@/components/posts/create/model/create-post-slice'

export const getBinaryImageData = async (imageObjects: ImageType[]) => {
  const binaryImages = []

  for (const imageObj of imageObjects) {
    const imageUrl = imageObj.img

    try {
      const response = await fetch(imageUrl)

      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer()
        const binaryData = new Uint8Array(arrayBuffer)

        binaryImages.push({ file: binaryData, type: imageObj.type })
      } else {
        console.error('Ошибка при загрузке изображения:', imageUrl)
      }
    } catch (error) {
      console.error('Произошла ошибка:', error)
    }
  }

  return binaryImages
}
