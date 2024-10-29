import React, { useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './range-slider.module.scss'

type RangeSliderProps = {
  getValue: (value: number) => void
}

const RangeSlider = ({ getValue }: RangeSliderProps) => {
  const [value, setValue] = useState<number[]>([0])

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue)
    getValue(newValue[0])
  }

  return (
    <div className={s.sliderWrapper}>
      <Slider.Root
        aria-label={'Percentage Slider'}
        className={s.sliderRoot}
        max={100}
        min={0}
        onValueChange={handleValueChange}
        step={1}
        value={value}
      >
        <Slider.Track className={s.sliderTrack}>
          <Slider.Range className={s.sliderRange} />
        </Slider.Track>
        <Slider.Thumb className={s.sliderThumb} />
      </Slider.Root>
      <div>{value[0]}%</div> {/* Отображение текущего значения */}
    </div>
  )
}

export default RangeSlider
