"use client"

import Link from "next/link"
import { CircleX, ExternalLink, Link as LinkIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
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

import { LocationCategoryCombobox } from "./ui/LocationCategoryCombobox"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"

interface FormValues {
  newLocation: string
  newCode?: string
  newCategory?: string
}

export function LocationMap() {
  const { toast } = useToast()

  const [existingMapLocations, setExistingMapLocations] = useLocalStorageState<
    LocationType[]
  >("mapLocations", {
    defaultValue: [],
  })

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = ({ newCode, newLocation, newCategory }: FormValues) => {
    setExistingMapLocations((prev) => [
      ...prev,
      { plusCode: newCode, label: newLocation, category: newCategory },
    ])
    reset()
  }

  const handleDeleteLocation = (locationToDelete: LocationType) => {
    setExistingMapLocations((prev) =>
      prev.filter(
        (prevLocation) => prevLocation.label !== locationToDelete.label
      )
    )
    toast({
      title: `Location Deleted`,
      description: `The location "${locationToDelete.label}" has been deleted.`,
      variant: "success",
    })
  }

  return (
    <>
      <form
        className="grid grid-cols-12 items-center gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label className="col-span-12 text-left">Location</Label>
        <Input
          id="label"
          {...register("newLocation", { required: true })}
          placeholder="Label*"
          type="text"
          className="col-span-3"
        />
        <div className="col-span-3">
          <Controller
            name="newCategory"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocationCategoryCombobox
                onChange={onChange}
                selectedItem={value}
              />
            )}
          />
        </div>
        <Input
          {...register("newCode")}
          placeholder="+ Code"
          type="text"
          className="col-span-3"
        />
        {errors.newLocation && (
          <span className="col-span-2 text-red-500">
            This field is required
          </span>
        )}
        <Button type="submit" className="col-span-3">
          Add Location
        </Button>
      </form>
      <div className="items-center gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="flex items-center justify-center">
                + Code
                <Link
                  className="ml-3"
                  target="_blank"
                  href="https://plus.codes/map"
                >
                  <ExternalLink size="1rem" />
                </Link>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {existingMapLocations.map(({ plusCode, label, category }) => (
              <TableRow key={plusCode}>
                <TableCell>{label}</TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>
                  {plusCode && (
                    <Link
                      className="flex items-center justify-center"
                      target="_blank"
                      href={`https://plus.codes/${plusCode}`}
                    >
                      <LinkIcon size="1rem" className="mr-1" />
                      {plusCode}
                    </Link>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteLocation({ plusCode, label })}
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
