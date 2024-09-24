'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from '@robur_/ui-kit'

import styles from './Combobox.module.css'

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
]

export const Combobox = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outlined"
          role="combobox"
          aria-expanded={open}
          className={styles.comboboxButton}
        >
          {value
            ? frameworks.find(framework => framework.value === value)?.label
            : 'Select framework...'}
          <ChevronsUpDown className={styles.comboboxIcon} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={styles.comboboxContent}>
        <Command>
          <CommandInput placeholder="Search framework..." className={styles.commandInput} />
          <CommandList className={styles.commandList}>
            <CommandEmpty className={styles.commandEmpty}>No framework found.</CommandEmpty>
            <CommandGroup className={styles.commandGroup}>
              {frameworks.map(framework => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                  className={`${styles.commandItem} ${
                    value === framework.value
                      ? styles.commandItemSelected
                      : styles.commandItemUnselected
                  }`}
                >
                  <Check className="checkIcon" />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
