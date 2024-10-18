import { ChangeEvent, MouseEvent, ReactNode, useRef } from 'react'

import { Button } from '@robur_/ui-kit'

import s from './fileUploader.module.scss'

export type FileUploaderProps = {
  accept: string
  btnClassName?: string
  btnText: string
  children: ReactNode
  name: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FileUploader = ({
  accept,
  btnClassName,
  btnText,
  children,
  name,
  onChange,
}: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFileHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    inputRef.current?.click()
  }

  return (
    <>
      <button className={s.photoContainer} onClick={uploadFileHandler} type={'button'}>
        {children}
      </button>
      <Button className={btnClassName} onClick={uploadFileHandler} variant={'primary'}>
        {btnText}
      </Button>
      <input
        accept={accept}
        className={s.hidden}
        name={name}
        onChange={onChange}
        ref={inputRef}
        type={'file'}
      />
    </>
  )
}
