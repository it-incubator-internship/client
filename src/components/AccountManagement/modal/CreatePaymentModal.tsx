import { useTranslation } from '@/hooks/useTranslation'
import { Modal } from '@robur_/ui-kit'

type Props = {
  onApprove: () => void
  onClose: () => void
  open: boolean
}
export const CreatePaymentModal = ({ onApprove, onClose, open }: Props) => {
  const t = useTranslation()

  return (
    <Modal
      agreementTitle={'I agree'}
      buttonTitle={t.myProfileSettings.accountManagementPayment.modalCreatePayment.textButton}
      onClose={onClose}
      onCloseWithApproval={onApprove}
      open={open}
      title={t.myProfileSettings.accountManagementPayment.modalCreatePayment.title}
      withAgreement
    >
      {t.myProfileSettings.accountManagementPayment.modalCreatePayment.text}
    </Modal>
  )
}
