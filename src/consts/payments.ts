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
export const ACCOUNT_TYPE = 'accountType'
export const SUBSRIPTION_TYPE = 'subscriptionType'
export const AUTO_RENEWAL = 'autoRenewal'
