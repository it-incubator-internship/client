import { ImageType } from '@/components/posts/create/model/create-post-slice'

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()

    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })

async function getFilteredImg(imageSrc: string, filter: string = 'none'): Promise<unknown> {
  const image = await createImage(String(imageSrc))
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  canvas.width = image.width
  canvas.height = image.height

  ctx.translate(image.width / 2, image.height / 2)
  ctx.translate(-image.width / 2, -image.height / 2)

  ctx.filter = filter || 'none'
  ctx.drawImage(image, 0, 0)

  return canvas.toDataURL('image/jpeg')
}

export const saveFilteredImage = async (images: ImageType[]): Promise<ImageType[]> => {
  try {
    const updatedImages = await Promise.all(
      images.map(async el => {
        const filteredImage = await getFilteredImg(el.img, el.filter)

        return {
          id: el.id,
          img: filteredImage,
          type: 'image/jpeg',
        }
      })
    )

    console.log('updatedImages', updatedImages)

    return updatedImages as ImageType[]
  } catch (e) {
    return []
  }
}
