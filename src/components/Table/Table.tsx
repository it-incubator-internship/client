import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button, ControlledDatePicker } from '@robur_/ui-kit'

const Table = () => {
  type FormValues = {
    dateRange: [Date, null]
  }
  const { control } = useForm<FormValues>()
  const [startDate, _] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(
    startDate ? new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000) : null
  )

  return (
    <div>
      <h1>Hello world</h1>
      <Button>Test Button</Button>
      <ControlledDatePicker
        control={control}
        defaultValue={startDate}
        endDate={endDate}
        name={'dateRange'}
        setEndDate={setEndDate}
      />
    </div>
  )
}

export default Table
