'use client'

import * as React from 'react'

import { Button } from '@robur_/ui-kit'
import { Check, ChevronsUpDown } from 'lucide-react'

import styles from './Combobox.module.css'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

const frameworks = [
  {
    label: 'Next.js',
    value: 'next.js',
  },
  {
    label: 'SvelteKit',
    value: 'sveltekit',
  },
  {
    label: 'Nuxt.js',
    value: 'nuxt.js',
  },
  {
    label: 'Remix',
    value: 'remix',
  },
  {
    label: 'Astro',
    value: 'astro',
  },
]

export const Combobox = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className={styles.comboboxButton}
          role={'combobox'}
          variant={'outlined'}
        >
          {value
            ? frameworks.find(framework => framework.value === value)?.label
            : 'Select framework...'}
          <ChevronsUpDown className={styles.comboboxIcon} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={styles.comboboxContent}>
        <Command>
          <CommandInput className={styles.commandInput} placeholder={'Search framework...'} />
          <CommandList className={styles.commandList}>
            <CommandEmpty className={styles.commandEmpty}>No framework found.</CommandEmpty>
            <CommandGroup className={styles.commandGroup}>
              {frameworks.map(framework => (
                <CommandItem
                  className={`${styles.commandItem} ${
                    value === framework.value
                      ? styles.commandItemSelected
                      : styles.commandItemUnselected
                  }`}
                  key={framework.value}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                  value={framework.value}
                >
                  <Check className={'checkIcon'} />
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
