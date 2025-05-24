import { useTranslation } from '@/hooks/useTranslation'
import { Modal } from '@robur_/ui-kit'

type Props = {
  onClose: () => void
  open: boolean
}
export const SuccessModal = ({ onClose, open }: Props) => {
  const t = useTranslation()

  return (
    <Modal
      buttonTitle={t.myProfileSettings.accountManagementPayment.modalRequestSuccess.textButton}
      fullwidthButton
      onClose={onClose}
      open={open}
      title={t.myProfileSettings.accountManagementPayment.modalRequestSuccess.title}
    >
      {t.myProfileSettings.accountManagementPayment.modalRequestSuccess.text}
    </Modal>
  )
}
