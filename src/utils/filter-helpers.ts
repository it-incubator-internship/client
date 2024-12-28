import { ImageType } from '@/components/posts/create/model/create-post-slice'

const FILTERS = [
  {
    filter: 'none',
    name: 'No filter',
  },
  {
    filter: 'grayscale(100%)',
    name: 'Lark',
  },
  {
    filter: 'contrast(160%)',
    name: 'Gingham',
  },
  {
    filter: 'invert(80%)',
    name: 'Clarendon',
  },
  {
    filter: 'brightness(90%) grayscale(100%)',
    name: 'Moon',
  },
  {
    filter: 'contrast(110%) saturate(120%)',
    name: 'Mayfair',
  },
  {
    filter: 'sepia(40%) contrast(105%) brightness(110%)',
    name: 'Reyes',
  },
  {
    filter: 'brightness(90%) contrast(120%)',
    name: 'Hudson',
  },
  {
    filter: 'contrast(115%) sepia(10%)',
    name: 'Valencia',
  },
]

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

  ctx.filter =
    FILTERS.find(item => {
      return item.name === filter
    })?.filter || 'none'

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

    return updatedImages as ImageType[]
  } catch (e) {
    return []
  }
}
