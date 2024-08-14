"use client"

import { useState } from "react"
import useLocalStorageState from "use-local-storage-state"

import { useDialog } from "@/hooks/useDialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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

export function DefaultSettingsDialog() {
  const { isDialogOpen, toggleIsDialogOpen } = useDialog()
  const { toast } = useToast()

  const [journalNumber, setJournalNumber] =
    useLocalStorageState<number>("journalNumber")
  const [existingMapLocations, setExistingMapLocations] = useLocalStorageState<
    Record<string, string>
  >("mapLocations", {
    defaultValue: { Work: "5678" },
  })
  const [newLocation, setNewLocation] = useState<string>("")
  const [newCode, setNewCode] = useState<string>("")

  const handleSetJournalNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setJournalNumber(Number(event.target.value))
    toast({
      title: "Autosaved",
      description: "The new journal number has been autosaved.",
    })
  }

  const handleAddLocation = () => {
    if (newLocation && newCode) {
      setExistingMapLocations({
        ...existingMapLocations,
        [newLocation]: newCode,
      })
      setNewLocation("")
      setNewCode("")
      toast({
        title: "Location Added",
        description: "The new Google Plus Code has been added.",
      })
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={toggleIsDialogOpen}>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle>Default Settings</DialogTitle>
          <DialogDescription>
            Update the default settings of the sent metadata here. It will be
            stored in the local storage of the browser.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="journalNumber" className="text-right">
              Journal Number
            </Label>
            <Input
              id="journalNumber"
              value={journalNumber}
              onChange={handleSetJournalNumber}
              type="number"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-8 items-center gap-4">
            <Label htmlFor="google-plus-code" className="col-span-2 text-right">
              Add A Google Plus Code
            </Label>
            <Input
              id="new-location"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="Location"
              type="text"
              className="col-span-3"
            />
            <Input
              id="new-code"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="Plus Code"
              type="text"
              className="col-span-3"
            />
            <Button onClick={handleAddLocation} className="col-span-4">
              Add Location
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Location Name</TableHead>
              <TableHead>Google Plus Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(existingMapLocations).map((location) => (
              <TableRow key={location}>
                <TableCell>{location}</TableCell>
                <TableCell>{existingMapLocations[location]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogFooter>
          <Button type="submit" onClick={toggleIsDialogOpen}>
            Close Dialog
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
