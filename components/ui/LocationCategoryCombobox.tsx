"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import useLocalStorageState from "use-local-storage-state"

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
  selectedItem: string | undefined
  onChange: (value: string | undefined) => void
}

export function LocationCategoryCombobox({
  selectedItem,
  onChange,
}: ComboboxProps) {
  const [open, setOpen] = useState(false)

  const [existingLocationCategories] = useLocalStorageState<string[]>(
    "locationCategories",
    {
      defaultValue: [
        "Chez moi",
        "Public space",
        "Chez quelqu'un",
        "In transit",
        "Work",
        "School",
      ],
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
            ? existingLocationCategories.find(
                (category) => category === selectedItem
              )
            : "Select category..."}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {existingLocationCategories.map((category) => (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={() => {
                    onChange(category === selectedItem ? undefined : category)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      selectedItem === category ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
