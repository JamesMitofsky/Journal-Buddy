"use client"

import { CircleX } from "lucide-react"
import { useForm } from "react-hook-form"
import useLocalStorageState from "use-local-storage-state"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"

interface FormValues {
  newLocation: string
  newCode: string
}

export function LocationMap() {
  const { toast } = useToast()

  const [existingMapLocations, setExistingMapLocations] = useLocalStorageState<
    Record<string, string>
  >("mapLocations", {
    defaultValue: { "2323423": "Work" },
  })

  const { register, handleSubmit, reset } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    setExistingMapLocations((prev) => ({
      ...prev,
      [data.newCode]: data.newLocation,
    }))
    reset()
  }

  const handleDeleteLocation = ({
    address,
    label,
  }: {
    address: string
    label: string
  }) => {
    setExistingMapLocations((prev) => {
      const { [address]: _, ...rest } = prev
      return rest
    })
    toast({
      title: `Location "${label}" Deleted`,
      description: `The Google Plus Code "${address}" has been deleted.`,
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-8 items-center gap-4">
          <Label htmlFor="new-location" className="col-span-2 text-right">
            Add A Google Plus Code
          </Label>
          <Input
            id="new-location"
            {...register("newLocation", { required: true })}
            placeholder="Location"
            type="text"
            className="col-span-3"
          />
          <Input
            id="new-code"
            {...register("newCode", { required: true })}
            placeholder="Code"
            type="text"
            className="col-span-3"
          />
          <Button type="submit" className="col-span-4">
            Add Location
          </Button>
        </div>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location Name</TableHead>
            <TableHead>Google Plus Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(existingMapLocations).map(([address, label]) => (
            <TableRow key={address}>
              <TableCell>{label}</TableCell>
              <TableCell>{address}</TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() => handleDeleteLocation({ address, label })}
                >
                  <CircleX className="h-6 w-[1.3rem]" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
