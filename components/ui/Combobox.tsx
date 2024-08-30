"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import useLocalStorageState from "use-local-storage-state"

import { LocationType } from "@/types/LocationType"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ComboboxProps = {
  selectedItem: LocationType | undefined
  onChange: (value: LocationType | undefined) => void
}

export function Combobox({ selectedItem, onChange }: ComboboxProps) {
  const [open, setOpen] = useState(false)

  const [existingMapLocations] = useLocalStorageState<LocationType[]>(
    "mapLocations",
    {
      defaultValue: [],
    }
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedItem
            ? existingMapLocations.find(
                (address) => address.label === selectedItem.label
              )?.label
            : "Select location..."}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <Command>
          <CommandInput placeholder="Search address..." />
          <CommandList>
            <CommandEmpty>No address found.</CommandEmpty>
            <CommandGroup>
              {existingMapLocations.map((address) => (
                <CommandItem
                  key={address.latLongAddress}
                  value={address.label}
                  onSelect={() => {
                    onChange(
                      address.label === selectedItem?.label
                        ? undefined
                        : address
                    )
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      selectedItem?.label === address.label
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {address.label}
                  {address.latLongAddress && (
                    <span className="text-slate-400">
                      &nbsp;— {address.latLongAddress}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
