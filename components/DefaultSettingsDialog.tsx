"use client"

import { Label } from "@radix-ui/react-label"
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

import { LocationMap } from "./LocationMap"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
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

  const handleSetJournalNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setJournalNumber(Number(event.target.value))
    toast({
      title: "Autosaved",
      description: "The new journal number has been autosaved.",
    })
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
          <LocationMap />
        </div>
        <DialogFooter>
          <Button type="button" onClick={toggleIsDialogOpen}>
            Close Dialog
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
