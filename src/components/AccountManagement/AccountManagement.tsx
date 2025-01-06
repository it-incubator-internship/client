import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { SelectionGroup } from '@/components/SelectionGroup/SelectionGroup'
import { Button, FormRadioGroup, Modal, PaypalSvgrepoCom4, StripeSvgrepoCom4 } from "@robur_/ui-kit";

import s from './AccountManagement.module.scss'
import { useTranslation } from "@/hooks/useTranslation";
import Spinner from "@/components/Preloaders/Spinner/Spinner";
export const ACCOUNT_TYPES = {
  BUSINESS: { label: 'business', value: 'Business' },
  PERSONAL: { label: 'personal', value: 'Personal' },
} as const
export const SUBSCRIPTION_OPTIONS = {
  ONE_DAY: {
    label: '$10 per 1 Day',
    value: '1_day',
  },
  ONE_MONTH: {
    label: '$100 per Month',
    value: '1_month',
  },
  SEVEN_DAYS: {
    label: '$50 per 7 Days',
    value: '7_day',
  },
} as const

export type AccountType = (typeof ACCOUNT_TYPES)[keyof typeof ACCOUNT_TYPES]
export const AccountManagement = () => {
  //const [accountType, setAccountType] = useState<null | typeof accountType>(null)
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      accountType: '',
      subscriptionType: '',
    },
  })
  const [subscriptionStatus, setSubscriptionStatus] = useState<'error' | 'none' | 'success'>('none')
  const [loading, setLoading] = useState(false)
  const [modalRequestSuccess, setModalRequestSuccess] = useState(false)
  const [modalRequestError, setModalRequestError] = useState(false)
  const watchedAccountType = watch('accountType')

  const currentAccountType = watchedAccountType === ACCOUNT_TYPES.BUSINESS.label
  const t = useTranslation()
  const onSubmit = (data: any) => {
    console.log('Форма отправлена:', data)
    setLoading(true)
    // Эмуляция отправки данных
    setTimeout(() => {
      setLoading(false)
      // Условие для эмуляции успешного или неудачного результата
      if (data.subscriptionType === 10) {
        setSubscriptionStatus('success')
        setModalRequestSuccess(true)
      } else {
        setSubscriptionStatus('error')
        setModalRequestError(true)
        setLoading(false)
      }
    }, 2000)
  }
  const onChangeValueAccountType = (newValue: string) => {
    setValue('accountType', newValue)
  }
  const onChangeSubscriptionType = (newValue: string) => {
    setValue('subscriptionType', newValue)
  }

  function handleModalClosed() {
    modalRequestSuccess ? setModalRequestSuccess(false) : setModalRequestError(false)
  }

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectionGroup title={'Account type'}>
          <FormRadioGroup
            control={control}
            name={'accountType'}
            onValueChange={onChangeValueAccountType}
            options={[
              { label: ACCOUNT_TYPES.PERSONAL.label, value: ACCOUNT_TYPES.PERSONAL.value },
              { label: ACCOUNT_TYPES.BUSINESS.label, value: ACCOUNT_TYPES.BUSINESS.value },
            ]}
          />
        </SelectionGroup>
        {loading && <Spinner />}
        {currentAccountType && (
          <>
            <SelectionGroup title={'Your subscription costs:'}>
              <FormRadioGroup
                control={control}
                name={'subscriptionType'}
                onValueChange={onChangeSubscriptionType}
                options={[
                  {
                    label: SUBSCRIPTION_OPTIONS.ONE_DAY.label,
                    value: SUBSCRIPTION_OPTIONS.ONE_DAY.value,
                  },
                  {
                    label: SUBSCRIPTION_OPTIONS.SEVEN_DAYS.label,
                    value: SUBSCRIPTION_OPTIONS.SEVEN_DAYS.value,
                  },
                  {
                    label: SUBSCRIPTION_OPTIONS.ONE_MONTH.label,
                    value: SUBSCRIPTION_OPTIONS.ONE_MONTH.value,
                  },
                ]}
              />
            </SelectionGroup>
            <div className={s.blockPaymentButtons}>
              <button type={'submit'}>
                <PaypalSvgrepoCom4 className={s.svg} />
              </button>
              <span className={s.blockPaymentOr}>{'or'}</span>
              <button type={'submit'}>
                <StripeSvgrepoCom4 className={s.svg} />
              </button>
            </div>
          </>
        )}
      </form>
      {subscriptionStatus === 'success' && (
        <Modal
          buttonTitle={t.myProfileSettings.accountManagementPayment.modalRequestSuccess.textButton}
          fullwidthButton
          onClose={handleModalClosed}
          open={modalRequestSuccess}
          title={t.myProfileSettings.accountManagementPayment.modalRequestSuccess.title}
        >
          {t.myProfileSettings.accountManagementPayment.modalRequestSuccess.text}
        </Modal>
      )}
      {subscriptionStatus === 'error' && (
        <Modal
          buttonTitle={t.myProfileSettings.accountManagementPayment.modalRequestError.textButton}
          fullwidthButton
          onClose={handleModalClosed}
          open={modalRequestError}
          title={t.myProfileSettings.accountManagementPayment.modalRequestError.title}
        >
          {t.myProfileSettings.accountManagementPayment.modalRequestError.text}
        </Modal>
      )}
    </div>
  )
}
