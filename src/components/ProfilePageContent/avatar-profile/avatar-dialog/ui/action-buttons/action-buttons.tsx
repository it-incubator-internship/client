import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@robur_/ui-kit'

import s from './action-buttons.module.scss'

type ActionButtonsProps = {
  isError: string
  isFileLoad: boolean
  onSaveClick: () => void
  onSelectClick: () => void
}

export const ActionButtons = ({ isError, isFileLoad, onSaveClick, onSelectClick }: ActionButtonsProps) => {
  return (
    <>
      {!isFileLoad || isError ? (
        <Button className={s.selectBtn} onClick={onSelectClick}>
          Select from Computer
        </Button>
      ) : (
        <Dialog.Close asChild>
          <Button className={s.saveBtn} onClick={onSaveClick}>
            Save
          </Button>
        </Dialog.Close>
      )}
    </>
  )
}