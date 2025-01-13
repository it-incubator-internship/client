import { useTranslation } from '@/hooks/useTranslation'
import { Modal } from '@robur_/ui-kit'

type Props = {
  onClose: () => void
  open: boolean
}
export const RequestErrorModal = ({ onClose, open }: Props) => {
  const t = useTranslation()

  return (
    <Modal
      buttonTitle={t.myProfileSettings.accountManagementPayment.modalRequestError.textButton}
      fullwidthButton
      onClose={onClose}
      open={open}
      title={t.myProfileSettings.accountManagementPayment.modalRequestError.title}
    >
      {t.myProfileSettings.accountManagementPayment.modalRequestError.text}
    </Modal>
  )
}
