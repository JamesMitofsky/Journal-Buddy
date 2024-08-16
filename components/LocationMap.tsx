"use client"

import { CircleX } from "lucide-react"
import { useForm } from "react-hook-form"
import useLocalStorageState from "use-local-storage-state"

import { LocationType } from "@/types/LocationType"
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
    LocationType[]
  >("mapLocations", {
    defaultValue: [{ plusCode: "2323423", label: "Work" }],
  })

  const { register, handleSubmit, reset } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    setExistingMapLocations((prev) => [
      ...prev,
      { plusCode: data.newCode, label: data.newLocation },
    ])
    reset()
  }

  const handleDeleteLocation = (address: string) => {
    setExistingMapLocations((prev) =>
      prev.filter((location) => location.plusCode !== address)
    )
    toast({
      title: `LocationType Deleted`,
      description: `The Google Plus Code "${address}" has been deleted.`,
    })
  }

  return (
    <>
      <form
        className="grid grid-cols-8 items-center gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label className="col-span-2 text-right">Google+ Code</Label>
        <Input
          id="label"
          {...register("newLocation", { required: true })}
          placeholder="Label"
          type="text"
          className="col-span-3"
        />
        <Input
          {...register("newCode", { required: true })}
          placeholder="Code"
          type="text"
          className="col-span-3"
        />
        <Button type="submit" className="col-span-8">
          Add LocationType
        </Button>
      </form>
      <div className="items-center gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {existingMapLocations.map(({ plusCode, label }) => (
              <TableRow key={plusCode}>
                <TableCell>{label}</TableCell>
                <TableCell>{plusCode}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => handleDeleteLocation(plusCode)}
                  >
                    <CircleX className="h-6 w-[1.3rem]" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
