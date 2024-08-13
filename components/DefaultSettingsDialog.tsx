'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter, DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDialog } from "@/hooks/useDialog";
import useLocalStorageState from "use-local-storage-state";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export function DefaultSettingsDialog() {
  const { isDialogOpen, toggleIsDialogOpen } = useDialog();
  const { toast } = useToast()
  
  const [journalNumber, setJournalNumber] = useLocalStorageState<number>('journalNumber')

  const handleSetJournalNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJournalNumber(Number(event.target.value))
    toast({
        title: 'Autosaved',
        description: 'The new journal number has been autosaved.',
    });
  }


  return (
    <Dialog open={isDialogOpen} onOpenChange={toggleIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Default Settings</DialogTitle>
          <DialogDescription>
            Update the default settings of the sent metadata here. It will be stored in the local storage of the browser.
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
        </div>
        <DialogFooter>
          <Button type="submit" onClick={toggleIsDialogOpen}>Close Dialog</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
