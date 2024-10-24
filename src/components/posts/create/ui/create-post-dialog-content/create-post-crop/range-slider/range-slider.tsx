import React, { useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

const styles = {
  sliderRange: {
    background: '#0070f3', // Цвет диапазона
    borderRadius: '3px',
    height: '100%',
  } as React.CSSProperties,

  sliderRoot: {
    position: 'relative',
    userSelect: 'none',
  } as React.CSSProperties,

  sliderThumb: {
    background: 'white', // Цвет ползунка
    border: '2px solid #0070f3', // Цвет рамки ползунка
    borderRadius: '50%',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    cursor: 'grab',
    height: '20px', // Высота ползунка
    width: '20px', // Ширина ползунка
  } as React.CSSProperties,

  sliderTrack: {
    background: '#e0e0e0', // Цвет трека
    borderRadius: '3px',
    height: '6px',
  } as React.CSSProperties,

  sliderWrapper: {
    margin: '20px',
    width: '300px', // Ширина ползунка
  } as React.CSSProperties,
}

const RangeSlider = () => {
  const [value, setValue] = useState<number[]>([50]) // Начальное значение 50%

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue)
  }

  return (
    <div style={styles.sliderWrapper}>
      <Slider.Root
        aria-label={'Percentage Slider'}
        max={100}
        min={0}
        onValueChange={handleValueChange}
        step={1}
        style={styles.sliderRoot}
        value={value}
      >
        <Slider.Track style={styles.sliderTrack}>
          <Slider.Range style={styles.sliderRange} />
        </Slider.Track>
        <Slider.Thumb style={styles.sliderThumb} />
      </Slider.Root>
      <div>{value[0]}%</div> {/* Отображение текущего значения */}
    </div>
  )
}

export default RangeSlider
