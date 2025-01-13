import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { RequestErrorModal } from '@/components/AccountManagement/modal/RequestErrorModal'
import { SuccessModal } from '@/components/AccountManagement/modal/SuccessModal'
import Spinner from '@/components/Preloaders/Spinner/Spinner'
import { SelectionGroup } from '@/components/SelectionGroup/SelectionGroup'
import { useTranslation } from '@/hooks/useTranslation'
import { accountManagementSchema, accountTypeFormValues } from '@/schemas/accountManagementSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormCheckbox, FormRadioGroup, PaypalSvgrepoCom4, StripeSvgrepoCom4 } from '@robur_/ui-kit'
import { useRouter } from 'next/router'

import s from './AccountManagement.module.scss'
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
type SubscriptionOptionLabel =
  (typeof SUBSCRIPTION_OPTIONS)[keyof typeof SUBSCRIPTION_OPTIONS]['label']
type accountType = {
  selectedAccount: 'business' | 'personal' | undefined
  selectedSubscriptionType: '$10 per 1 Day' | '$50 per 7 Days' | '$100 per Month' | undefined
}
export type AccountType = (typeof ACCOUNT_TYPES)[keyof typeof ACCOUNT_TYPES]
export const AccountManagement = () => {
  const [accountType, setAccountType] = useState<accountType>({
    selectedAccount: 'personal',
    selectedSubscriptionType: '$10 per 1 Day',
  })
  const t = useTranslation()
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<accountTypeFormValues>({
    defaultValues: {
      accountType: ACCOUNT_TYPES.PERSONAL.label,
      autoRenewal: false,
      subscriptionType: SUBSCRIPTION_OPTIONS.ONE_DAY.label,
    },
    resolver: zodResolver(accountManagementSchema(t)),
  })
  const router = useRouter()
  const [accountWithSubscription, setAccountWithSubscription] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalRequestSuccess, setModalRequestSuccess] = useState(false)
  const [modalRequestError, setModalRequestError] = useState(false)
  const watchedSubscriptionType = watch('subscriptionType')
  const watchedAutoRenewal = watch('autoRenewal')
  const currentAccountTypeBusiness = accountType.selectedAccount === ACCOUNT_TYPES.BUSINESS.label

  useEffect(() => {
    if (currentAccountTypeBusiness) {
      reset({
        accountType: ACCOUNT_TYPES.BUSINESS.label,
        autoRenewal: watchedAutoRenewal,
        subscriptionType: watchedSubscriptionType,
      })
    }
  }, [currentAccountTypeBusiness, reset, router.locale])

  const onSubmit = (data: any) => {
    if (!currentAccountTypeBusiness) {
      return
    }
    console.log('Форма отправлена:', data)
    setLoading(true)
    // Эмуляция отправки данных
    setTimeout(() => {
      setLoading(false)
      // Условие для эмуляции успешного или неудачного результата
      if (data.subscriptionType) {
        setModalRequestSuccess(true)
        setAccountWithSubscription(true)
      } else {
        setModalRequestError(true)
        setAccountWithSubscription(false)
      }
    }, 2000)
  }
  const onChangeValueAccountType = (newValue: 'business' | 'personal') => {
    setAccountType({ ...accountType, selectedAccount: newValue })
    setValue('accountType', newValue)
  }
  const onChangeSubscriptionType = (newValue: SubscriptionOptionLabel) => {
    setAccountType({ ...accountType, selectedSubscriptionType: newValue })
    setValue('subscriptionType', newValue)
  }

  function handleModalSuccessClose() {
    setModalRequestSuccess(false)
  }
  function handleModalRequestErrorClose() {
    setModalRequestError(false)
  }
  if (loading) {
    return <Spinner />
  }

  return (
    <div className={s.container}>
      {accountWithSubscription && (
        <SelectionGroup title={t.myProfileSettings.accountManagementPayment.currentSubscription}>
          <section className={s.blockCurrentSubscription}>
            <div className={s.blockData}>
              <p>{t.myProfileSettings.accountManagementPayment.expire}</p>
              <p>11.02.2025</p>
            </div>
            <div className={s.blockData}>
              <p>{t.myProfileSettings.accountManagementPayment.nextPayment}</p>
              <p>11.03.2025</p>
            </div>
          </section>
        </SelectionGroup>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentAccountTypeBusiness && (
          <div className={s.AutoRenewalCheckbox}>
            <FormCheckbox control={control} name={'autoRenewal'}>
              <span> {t.myProfileSettings.accountManagementPayment.autoRenewal}</span>
            </FormCheckbox>
          </div>
        )}
        <SelectionGroup title={t.myProfileSettings.accountManagementPayment.accountType}>
          <FormRadioGroup
            control={control}
            disabled={accountWithSubscription}
            error={errors?.accountType}
            name={'accountType'}
            onValueChange={onChangeValueAccountType}
            options={[
              { label: ACCOUNT_TYPES.PERSONAL.label, value: ACCOUNT_TYPES.PERSONAL.value },
              { label: ACCOUNT_TYPES.BUSINESS.label, value: ACCOUNT_TYPES.BUSINESS.value },
            ]}
          />
        </SelectionGroup>
        {currentAccountTypeBusiness && (
          <>
            <SelectionGroup title={t.myProfileSettings.accountManagementPayment.subscriptionCosts}>
              <FormRadioGroup
                control={control}
                error={errors?.subscriptionType}
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
      {modalRequestSuccess && (
        <SuccessModal onClose={handleModalSuccessClose} open={modalRequestSuccess} />
      )}

      {modalRequestError && (
        <RequestErrorModal onClose={handleModalRequestErrorClose} open={modalRequestError} />
      )}
    </div>
  )
}
