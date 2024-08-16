"use client"

import * as React from "react"
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

export function Combobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const [existingMapLocations] = useLocalStorageState<LocationType[]>(
    "mapLocations",
    {
      defaultValue: [{ plusAddress: "test value", label: "test label" }],
    }
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? existingMapLocations.find((address) => address.label === value)
                ?.label
            : "Select location..."}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search address..." />
          <CommandList>
            <CommandEmpty>No address found.</CommandEmpty>
            <CommandGroup>
              {existingMapLocations.map((address) => (
                <CommandItem
                  key={address.plusAddress}
                  value={address.label}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === address.label ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {address.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
