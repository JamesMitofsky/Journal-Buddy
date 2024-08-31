"use client"

import Link from "next/link"
import { CircleX, ExternalLink, Link as LinkIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import useLocalStorageState from "use-local-storage-state"
import { v4 as uuidv4 } from "uuid"

import { LocationType } from "@/types/LocationType"
import createGoogleMapsLatLongUrl from "@/lib/createGoogleMapsLatLongUrl"
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
  newId: string
  newLabel: string
  newLatLong?: string
  newCategory?: string
}

type LocalStorageLocationType = {
  id: string
} & LocationType

export function LocationMap() {
  const { toast } = useToast()

  const [existingMapLocations, setExistingMapLocations] = useLocalStorageState<
    LocalStorageLocationType[]
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

  const onSubmit = ({ newLatLong, newLabel, newCategory }: FormValues) => {
    setExistingMapLocations((prev) => [
      ...prev,
      {
        id: uuidv4(),
        latLongAddress: newLatLong,
        label: newLabel,
        category: newCategory,
      },
    ])
    reset()
  }

  const handleDeleteLocation = (locationToDelete: LocalStorageLocationType) => {
    setExistingMapLocations((prev) =>
      prev.filter((prevLocation) => prevLocation.id !== locationToDelete.id)
    )
    toast({
      title: `Location Deleted`,
      description: `The location "${locationToDelete.label}" has been deleted.`,
      variant: "success",
    })
  }

  const validateLatLong = (value: string | undefined) => {
    if (!value) return true
    const regex = /^-?\d{1,2}\.\d+,\s?-?\d{1,3}\.\d+$/
    return (
      regex.test(value) ||
      "Verify the lat/long format. It should look something like 44.262081, -72.580682"
    )
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
          {...register("newLabel", { required: true })}
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
          {...register("newLatLong", { validate: validateLatLong })}
          placeholder="Latitude Longitutde Values"
          type="text"
          className="col-span-3"
        />
        {errors.newLabel && (
          <span className="col-span-12 text-red-500">
            This field is required
          </span>
        )}
        {errors.newLatLong && (
          <span className="col-span-12 text-red-500">
            {errors.newLatLong.message}
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
                Latitude, Longitude
                <Link
                  className="ml-3"
                  target="_blank"
                  href="https://maps.google.com"
                >
                  <ExternalLink size="1rem" />
                </Link>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {existingMapLocations.map(
              ({ latLongAddress, label, category, id }) => (
                <TableRow key={latLongAddress}>
                  <TableCell>{label}</TableCell>
                  <TableCell>{category}</TableCell>
                  <TableCell>
                    {latLongAddress && (
                      <Link
                        className="flex items-center justify-center"
                        target="_blank"
                        href={createGoogleMapsLatLongUrl(latLongAddress)}
                      >
                        <LinkIcon size="1rem" className="mr-1" />
                        {latLongAddress}
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteLocation({ label, id })}>
                      <CircleX className="h-6 w-[1.3rem]" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
