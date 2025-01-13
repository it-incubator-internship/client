import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { RequestErrorModal } from '@/components/AccountManagement/modal/RequestErrorModal'
import { SuccessModal } from '@/components/AccountManagement/modal/SuccessModal'
import Spinner from '@/components/Preloaders/Spinner/Spinner'
import { SelectionGroup } from '@/components/SelectionGroup/SelectionGroup'
import { ACCOUNT_TYPE, ACCOUNT_TYPES, AUTO_RENEWAL, SUBSCRIPTION_OPTIONS, SUBSRIPTION_TYPE } from "@/consts/payments";
import { useTranslation } from '@/hooks/useTranslation'
import { accountManagementSchema, accountTypeFormValues } from '@/schemas/accountManagementSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormCheckbox, FormRadioGroup, PaypalSvgrepoCom4, StripeSvgrepoCom4 } from '@robur_/ui-kit'
import { useRouter } from 'next/router'

import s from './AccountManagement.module.scss'

type SubscriptionOptionLabel =
  (typeof SUBSCRIPTION_OPTIONS)[keyof typeof SUBSCRIPTION_OPTIONS]['label']
type AccountType = (typeof ACCOUNT_TYPES)[keyof typeof ACCOUNT_TYPES]['label']
type AccountTypeState = {
  autoRenewal: boolean
  selectedAccount: AccountType | undefined
  selectedSubscriptionType: SubscriptionOptionLabel | undefined
}
export const AccountManagement = () => {
  const [accountType, setAccountType] = useState<AccountTypeState>({
    autoRenewal: false,
    selectedAccount: ACCOUNT_TYPES.PERSONAL.label,
    selectedSubscriptionType: SUBSCRIPTION_OPTIONS.ONE_DAY.label,
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
  const watchedSubscriptionType = watch(SUBSRIPTION_TYPE)
  const watchedAutoRenewal = watch(AUTO_RENEWAL)
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
      if (data.subscriptionType === 10) {
        setModalRequestSuccess(true)
        setAccountWithSubscription(true)
      } else {
        setModalRequestError(true)
      }
    }, 2000)
  }
  const onChangeValueAccountType = (newValue: AccountType) => {
    setAccountType({ ...accountType, selectedAccount: newValue })
    setValue(ACCOUNT_TYPE, newValue)
  }
  const onChangeSubscriptionType = (newValue: SubscriptionOptionLabel) => {
    setAccountType({ ...accountType, selectedSubscriptionType: newValue })
    setValue(SUBSRIPTION_TYPE, newValue)
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
            <FormCheckbox control={control} name={AUTO_RENEWAL}>
              <span> {t.myProfileSettings.accountManagementPayment.autoRenewal}</span>
            </FormCheckbox>
          </div>
        )}
        <SelectionGroup title={t.myProfileSettings.accountManagementPayment.accountType}>
          <FormRadioGroup
            control={control}
            disabled={accountWithSubscription}
            error={errors?.accountType}
            name={ACCOUNT_TYPE}
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
                name={SUBSRIPTION_TYPE}
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
