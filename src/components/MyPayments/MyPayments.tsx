import React from 'react'

import { MyPaymentsRow } from '@/components/MyPayments/MyPaymentsRow/MyPaymentsRow'
import { TableHeader } from '@/components/TableHeader/TableHeader'
import { myPaymentsTable } from '@/consts/tables'
import { useTranslation } from '@/hooks/useTranslation'
import { Table } from '@robur_/ui-kit'

import s from './MyPayments.module.scss'

const items = [
  {
    end_date: '12.01.2025',
    id: 1,
    payment_date: '12.01.2024',
    payment_type: 'Stripe',
    price: 1000,
    subscription_type: 'Premium',
  },
  {
    end_date: '12.01.2025',
    id: 2,
    payment_date: '12.01.2024',
    payment_type: 'Stripe',
    price: 2000,
    subscription_type: 'Premium',
  },
  {
    end_date: '12.01.2025',
    id: 3,
    payment_date: '12.01.2024',
    payment_type: 'Paypal',
    price: 3000,
    subscription_type: 'Premium',
  },
  {
    end_date: '12.01.2025',
    id: 4,
    payment_date: '12.01.2024',
    payment_type: 'Stripe',
    price: 4000,
    subscription_type: 'Premium',
  },
]

export const MyPayments = () => {
  const t = useTranslation()

  if (!items.length) {
    return <Table.Empty>No data....</Table.Empty>
  }

  return (
    <div className={s.container}>
      <div className={s.block}>
        <Table.Root>
          <TableHeader item={myPaymentsTable} />
          <Table.Body>
            {items.map(el => (
              <MyPaymentsRow key={el.id} payment={el} />
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  )
}
