import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { CancelSubscriptionModal } from '@/components/AccountManagement/modal/CancelSubscriptionModal'
import { CreatePaymentModal } from '@/components/AccountManagement/modal/CreatePaymentModal'
import { RequestErrorModal } from '@/components/AccountManagement/modal/RequestErrorModal'
import { SuccessModal } from '@/components/AccountManagement/modal/SuccessModal'
import Spinner from '@/components/Preloaders/Spinner/Spinner'
import { SelectionGroup } from '@/components/SelectionGroup/SelectionGroup'
import {
  ACCOUNT_TYPE,
  ACCOUNT_TYPES,
  SUBSCRIPTION_OPTIONS,
  SUBSRIPTION_TYPE,
} from '@/consts/payments'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { accountManagementSchema, accountTypeFormValues } from '@/schemas/accountManagementSchema'
import {
  useCancelSubscriptionMutation,
  useGetMyCurrentSubscriptionQuery,
  useGetTariffPlanesQuery,
  useLazyGetPaymentLinkByTariffIdQuery,
} from '@/services/profile/profile-api'
import { PaymentTariffsReturnType, PaymentType } from '@/services/profile/profile-types'
import convertDate from '@/utils/convertDate'
import { showErrorToast, showSuccessToast } from '@/utils/toastConfig'
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox, FormRadioGroup, PaypalSvgrepoCom4, StripeSvgrepoCom4 } from '@robur_/ui-kit'
import { useParams, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import s from './AccountManagement.module.scss'

type SubscriptionOptionLabel =
  (typeof SUBSCRIPTION_OPTIONS)[keyof typeof SUBSCRIPTION_OPTIONS]['label']
type AccountType = (typeof ACCOUNT_TYPES)[keyof typeof ACCOUNT_TYPES]['label']
type AccountTypeState = {
  selectedAccount: AccountType | undefined
  selectedSubscriptionType: SubscriptionOptionLabel | undefined
}
export const AccountManagement = () => {
  const [accountType, setAccountType] = useState<AccountTypeState>({
    selectedAccount: ACCOUNT_TYPES.PERSONAL.label,
    selectedSubscriptionType: SUBSCRIPTION_OPTIONS.ONE_DAY.label,
  })
  const { data: tariffsData, isLoading: isTariffsLoading } = useGetTariffPlanesQuery()
  const { data: subscriptionData } = useGetMyCurrentSubscriptionQuery()
  const [cancelSubscription] = useCancelSubscriptionMutation()
  const [getPaymentLink] = useLazyGetPaymentLinkByTariffIdQuery()

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
      subscriptionType: undefined,
    },
    resolver: zodResolver(accountManagementSchema(t)),
  })
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [paymentSystem, setPaymentSystem] = useState(null)
  const [createPaymentModalOpened, setCreatePaymentModalOpened] = useState(false)
  const [cancelSubscriptionModalOpened, setCancelSubscriptionModalOpened] = useState(false)
  const watchedSubscriptionType = watch(SUBSRIPTION_TYPE)
  const currentAccountTypeBusiness = accountType.selectedAccount === ACCOUNT_TYPES.BUSINESS.label
  const [paymentResult, setPaymentResult] = useState('')
  let options: PaymentType[] | undefined

  useEffect(() => {
    const paymentResult = searchParams.get('payment_result')

    if (paymentResult) {
      setPaymentResult(paymentResult)
    }
  }, [])

  useEffect(() => {
    if (currentAccountTypeBusiness) {
      reset({
        accountType: ACCOUNT_TYPES.BUSINESS.label,
        subscriptionType: watchedSubscriptionType,
      })
    }
  }, [currentAccountTypeBusiness, reset, router.locale])

  useEffect(() => {
    setAccountType({
      selectedAccount: ACCOUNT_TYPES.BUSINESS.label,
      selectedSubscriptionType: undefined,
    })
  }, [subscriptionData])

  if (isTariffsLoading) {
    return <Spinner />
  }

  if (tariffsData) {
    options = tariffsData?.reduce(
      (acc: PaymentType[], current: PaymentTariffsReturnType): PaymentType[] => {
        if (!acc.some(item => item.period === current.period)) {
          acc.push({
            label: `$${current.price} per ${current.period} Day`,
            period: current.period,
            price: current.price,
            value: `${current.period}_day`,
          })
        }

        return acc
      },
      []
    )
  }

  const createPaymentHandler = (evt: any) => {
    const paymentSystem = evt.currentTarget.dataset.option

    setPaymentSystem(paymentSystem)
    setCreatePaymentModalOpened(true)
  }

  const cancelSubscriptionHandler = async () => {
    try {
      await cancelSubscription()
      showSuccessToast(t.myProfileSettings.accountManagementPayment.modalCancelSubscription.success)
    } catch (e) {
      showErrorToast(t.myProfileSettings.accountManagementPayment.modalCancelSubscription.error)
    }
  }

  const onSubmit = async (data: any) => {
    if (!currentAccountTypeBusiness) {
      return
    }

    const paymentOption = options?.find(option => {
      return option.label === data.subscriptionType
    })?.period
    const tariffId = tariffsData?.find(tariff => {
      return tariff.period === paymentOption && tariff.paymentSystem === paymentSystem
    })?.tariffId

    if (tariffId) {
      try {
        setLoading(true)
        const res = await getPaymentLink(tariffId)
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

  const handleChangeAutoRenewal = () => {
    setCancelSubscriptionModalOpened(true)
  }

  function handleCancelSubscriptionModalClose() {
    setCancelSubscriptionModalOpened(false)
  }

  function handleCreateModalClose() {
    setCreatePaymentModalOpened(false)
  }
  function handleModalPaymentResultClose() {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    newSearchParams.delete('payment_result')
    // router.replace(`${PATH.PROFILE_EDIT}/${params.userId}/account?${newSearchParams.toString()}`)
    router.push(`${PATH.PROFILE_EDIT}/${params.userId}/account`)
    setPaymentResult('')
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className={s.container}>
      {subscriptionData && (
        <SelectionGroup title={t.myProfileSettings.accountManagementPayment.currentSubscription}>
          <section className={s.blockCurrentSubscription}>
            <div className={s.blockData}>
              <p>{t.myProfileSettings.accountManagementPayment.expire}</p>
              <p>{convertDate.toLocaleString(subscriptionData.subscriptionCreatedAt)}</p>
            </div>
            <div className={s.blockData}>
              <p>{t.myProfileSettings.accountManagementPayment.nextPayment}</p>
              <p>{convertDate.toLocaleString(subscriptionData.subscriptionEndAt)}</p>
            </div>
          </section>
        </SelectionGroup>
      )}
      {subscriptionData && currentAccountTypeBusiness && (
        <div className={s.AutoRenewalCheckbox}>
          <Checkbox
            checked={subscriptionData.isRenewal}
            disabled={!subscriptionData.isRenewal}
            onCheckedChange={handleChangeAutoRenewal}
            type={'button'}
          >
            <span> {t.myProfileSettings.accountManagementPayment.autoRenewal}</span>
          </Checkbox>
        </div>
      )}
      <form>
        <SelectionGroup title={t.myProfileSettings.accountManagementPayment.accountType}>
          <FormRadioGroup
            control={control}
            disabled={!!subscriptionData}
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
            {watchedSubscriptionType && (
              <div className={s.blockPaymentButtons}>
                <button
                  data-option={'paypal'}
                  name={'Paypal'}
                  onClick={createPaymentHandler}
                  type={'button'}
                >
                  <PaypalSvgrepoCom4 className={s.svg} />
                </button>
                <span className={s.blockPaymentOr}>{'or'}</span>
                <button
                  data-option={'stripe'}
                  name={'Stripe'}
                  onClick={createPaymentHandler}
                  type={'button'}
                >
                  <StripeSvgrepoCom4 className={s.svg} />
                </button>
              </div>
            )}
          </>
        )}
      </form>
      {cancelSubscriptionModalOpened && (
        <CancelSubscriptionModal
          onApprove={cancelSubscriptionHandler}
          onClose={handleCancelSubscriptionModalClose}
          open={cancelSubscriptionModalOpened}
        />
      )}

      {createPaymentModalOpened && (
        <CreatePaymentModal
          onApprove={handleSubmit(onSubmit)}
          onClose={handleCreateModalClose}
          open={createPaymentModalOpened}
        />
      )}

      {paymentResult === 'success' && (
        <SuccessModal onClose={handleModalPaymentResultClose} open={paymentResult === 'success'} />
      )}

      {paymentResult === 'error' && (
        <RequestErrorModal
          onClose={handleModalPaymentResultClose}
          open={paymentResult === 'error'}
        />
      )}
    </div>
  )
}
