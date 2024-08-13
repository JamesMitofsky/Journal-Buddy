"use client"

import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDialog } from "@/hooks/useDialog";

export function DefaultSettings() {

  const { toggleIsDialogOpen} = useDialog();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleIsDialogOpen}
    >
      <Settings className="h-6 w-[1.3rem]" />
    </Button>
  )
}
