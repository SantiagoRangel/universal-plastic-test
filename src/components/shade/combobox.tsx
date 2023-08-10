"use client"

import * as React from "react"

import { Button } from "./button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

import cities from "../../data/cities.json"

interface City {
  id: number
  city: string
  timezone: string
  location: {
    type: string
    coordinates: number[]
  }
}

interface ComboBoxProps {
  setSelectedCity: React.Dispatch<React.SetStateAction<City | undefined>>
}

export function ComboboxDemo({ setSelectedCity }: ComboBoxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<City | undefined>(undefined)

  React.useEffect(() => {
    value && setSelectedCity(value)
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-[#ECF9FD] text-base font-normal text-cyan-800"
        >
          {value
            ? cities.find((city) => city.city === value.city)?.city
            : "Select city..."}
          <img src="/arrows-select.svg" />
          {/* <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search city..." className="h-9" />
          <CommandEmpty>No city found.</CommandEmpty>
          <CommandGroup>
            {cities.map((city: City) => (
              <CommandItem
                key={city.id}
                onSelect={() => {
                  setValue(city)
                  setOpen(false)
                }}
              >
                {city.city}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
