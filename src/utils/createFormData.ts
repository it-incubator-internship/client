type Props = {
  file: Uint8Array
  type: string
}

export const createFormData = (payload: Props | Props[]) => {
  const formData = new FormData()

  if (payload instanceof Array) {
    payload.forEach((item, idx) => {
      const blob = new Blob([item.file], { type: item.type })

      formData.append('file', blob, idx.toString())
    })
  } else {
    const blob = new Blob([payload.file], { type: payload.type })

    formData.append('file', blob, '0')
  }

  return formData
}
