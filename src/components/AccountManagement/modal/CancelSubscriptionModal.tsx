import { useTranslation } from '@/hooks/useTranslation'
import { Modal } from '@robur_/ui-kit'

type Props = {
  onApprove: () => void
  onClose: () => void
  open: boolean
}
export const CancelSubscriptionModal = ({ onApprove, onClose, open }: Props) => {
  const t = useTranslation()

  return (
    <Modal
      agreementTitle={'I agree'}
      buttonTitle={t.myProfileSettings.accountManagementPayment.modalCancelSubscription.textButton}
      onClose={onClose}
      onCloseWithApproval={onApprove}
      open={open}
      title={t.myProfileSettings.accountManagementPayment.modalCancelSubscription.title}
      withAgreement
    >
      {t.myProfileSettings.accountManagementPayment.modalCancelSubscription.text}
    </Modal>
  )
}
