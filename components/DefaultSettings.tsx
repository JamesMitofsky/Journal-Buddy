"use client"

import { usePathname } from "next/navigation"
import { Settings } from "lucide-react"

import { useDialog } from "@/hooks/useDialog"

import { Button } from "./ui/button"

export function DefaultSettings() {
  const { toggleIsDialogOpen } = useDialog()
  const pathname = usePathname()

  return (
    <>
      {pathname === "/transcribe" && (
        <Button variant="ghost" size="icon" onClick={toggleIsDialogOpen}>
          <Settings className="h-6 w-[1.3rem]" />
        </Button>
      )}
    </>
  )
}
