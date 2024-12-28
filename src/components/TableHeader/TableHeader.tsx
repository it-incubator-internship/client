import { Table } from '@robur_/ui-kit'

type tableName = {
  key: string
  title: string
}

type Props = {
  item: tableName[]
}

export const TableHeader = ({ item }: Props) => {
  return (
    <Table.Head>
      <Table.Row>
        {item.map(el => (
          <Table.HeaderCell key={el.key}>{el.title}</Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Head>
  )
}
