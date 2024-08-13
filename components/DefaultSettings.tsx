"use client"

import { Settings } from "lucide-react"

import { Button } from "@/components/ui/button"

export function DefaultSettings() {

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => console.log('open settings dialog')}
    >
      <Settings className="h-6 w-[1.3rem]" />
    </Button>
  )
}
