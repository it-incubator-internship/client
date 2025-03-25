import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { RequestErrorModal } from '@/components/AccountManagement/modal/RequestErrorModal'
import { SuccessModal } from '@/components/AccountManagement/modal/SuccessModal'
import Spinner from '@/components/Preloaders/Spinner/Spinner'
import { SelectionGroup } from '@/components/SelectionGroup/SelectionGroup'
import {
  ACCOUNT_TYPE,
  ACCOUNT_TYPES,
  AUTO_RENEWAL,
  SUBSCRIPTION_OPTIONS,
  SUBSRIPTION_TYPE,
} from '@/consts/payments'
import { useTranslation } from '@/hooks/useTranslation'
import { accountManagementSchema, accountTypeFormValues } from '@/schemas/accountManagementSchema'
import {
  useGetTariffPlanesQuery,
  useLazyGetPaymentLinkByTariffIdQuery,
} from '@/services/profile/profile-api'
import { PaymentTariffsReturnType, PaymentType } from '@/services/profile/profile-types'
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
  const { data: tariffsData, isLoading: isTariffsLoading } = useGetTariffPlanesQuery()
  const [getPaytmentLink, { isLoading: isGetPaymentLinkLoading }] =
    useLazyGetPaymentLinkByTariffIdQuery()

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
  let options: PaymentType[] | undefined

  useEffect(() => {
    if (currentAccountTypeBusiness) {
      reset({
        accountType: ACCOUNT_TYPES.BUSINESS.label,
        autoRenewal: watchedAutoRenewal,
        subscriptionType: watchedSubscriptionType,
      })
    }
  }, [currentAccountTypeBusiness, reset, router.locale])

  if (isTariffsLoading) {
    return <Spinner />
  }

  if (tariffsData) {
    options = tariffsData?.reduce(
      (acc: PaymentType[], current: PaymentTariffsReturnType): PaymentType[] => {
        if (!acc.some(item => item.period === current.period)) {
          acc.push({
            label: `$${123} per ${current.period} Day`,
            period: current.period,
            price: 123,
            value: `${current.period}_day`,
          })
        }

        return acc
      },
      []
    )
  }

  const onSubmit = async (data: any, event: any) => {
    if (!currentAccountTypeBusiness) {
      return
    }

    const paymentOption = options?.find(option => {
      return option.label === data.subscriptionType
    })?.period
    const submitter = event.nativeEvent.submitter
    const paymentSystem = submitter?.dataset.option
    const tariffId = tariffsData?.find(tariff => {
      return tariff.period === paymentOption && tariff.paymentSystem === paymentSystem
    })?.tariffId

    if (tariffId) {
      try {
        setLoading(true)
        const res = await getPaytmentLink(tariffId)
        const paymentLink = res?.data?.paymentLink

        if (paymentLink) {
          document.location = paymentLink
        }
      } catch (e) {
        console.dir(e)
      } finally {
        setLoading(false)
      }
    }

    // // Эмуляция отправки данных
    // setTimeout(() => {
    //   setLoading(false)
    //   // Условие для эмуляции успешного или неудачного результата
    //   if (data.subscriptionType) {
    //     setModalRequestSuccess(true)
    //     setAccountWithSubscription(true)
    //   } else {
    //     setModalRequestError(true)
    //   }
    // }, 2000)
  }
  const handleChangeValueAccountType = (newValue: AccountType) => {
    setAccountType({ ...accountType, selectedAccount: newValue })
    setValue(ACCOUNT_TYPE, newValue)
  }
  const handleChangeSubscriptionType = (newValue: SubscriptionOptionLabel) => {
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
            onValueChange={handleChangeValueAccountType}
            options={[
              { label: ACCOUNT_TYPES.PERSONAL.label, value: ACCOUNT_TYPES.PERSONAL.value },
              { label: ACCOUNT_TYPES.BUSINESS.label, value: ACCOUNT_TYPES.BUSINESS.value },
            ]}
          />
        </SelectionGroup>
        {currentAccountTypeBusiness && options && (
          <>
            <SelectionGroup title={t.myProfileSettings.accountManagementPayment.subscriptionCosts}>
              <FormRadioGroup
                control={control}
                error={errors?.subscriptionType}
                name={SUBSRIPTION_TYPE}
                onValueChange={handleChangeSubscriptionType}
                options={options}
              />
            </SelectionGroup>
            <div className={s.blockPaymentButtons}>
              <button data-option={'paypal'} name={'Paypal'} type={'submit'}>
                <PaypalSvgrepoCom4 className={s.svg} />
              </button>
              <span className={s.blockPaymentOr}>{'or'}</span>
              <button data-option={'stripe'} name={'Stripe'} type={'submit'}>
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
