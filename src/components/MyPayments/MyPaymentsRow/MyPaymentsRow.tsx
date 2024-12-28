import { PaymentType } from '@/services/payments/paymentsTypes'
import { Table } from '@robur_/ui-kit'

type Props = {
  payment: PaymentType
}

export const MyPaymentsRow = ({ payment }: Props) => {
  return (
    <Table.Row>
      <Table.Cell>
        <h3>{payment.payment_date}</h3>
      </Table.Cell>
      <Table.Cell>{payment.end_date}</Table.Cell>
      {/*<Table.Cell>{new Date(deck.updated).toLocaleDateString('ru-RU')}</Table.Cell>*/}
      <Table.Cell>{payment.price}</Table.Cell>
      <Table.Cell>{payment.subscription_type}</Table.Cell>
      <Table.Cell>{payment.payment_type}</Table.Cell>
    </Table.Row>
  )
}
