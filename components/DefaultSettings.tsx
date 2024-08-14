"use client"

import { Settings } from "lucide-react"

import { useDialog } from "@/hooks/useDialog"
import { Button } from "@/components/ui/button"

export function DefaultSettings() {
  const { toggleIsDialogOpen } = useDialog()

  return (
    <Button variant="ghost" size="icon" onClick={toggleIsDialogOpen}>
      <Settings className="h-6 w-[1.3rem]" />
    </Button>
  )
}
