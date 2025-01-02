import { ChangeEvent, MouseEvent, ReactNode, useRef } from 'react'

import { Button } from '@demorest49de/ui-kit'
import clsx from 'clsx'

import s from './fileUploader.module.scss'

export type FileUploaderProps = {
  accept: string
  btnClassName?: string
  btnText: string
  children: ReactNode
  className?: string
  name: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FileUploader = ({
  accept,
  btnClassName,
  btnText,
  children,
  className,
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
      <button
        className={clsx(s.photoContainer, className)}
        onClick={uploadFileHandler}
        type={'button'}
      >
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
