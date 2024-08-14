"use client"

import { ReactNode, createContext, useContext, useState } from "react"

// Define the shape of the context state
interface DialogContextType {
  isDialogOpen: boolean
  toggleIsDialogOpen: () => void
}

// Create the context with default values
const DialogContext = createContext<DialogContextType | undefined>(undefined)

// Create a provider component
export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const toggleIsDialogOpen = () => setIsDialogOpen((prev) => !prev)

  return (
    <DialogContext.Provider value={{ isDialogOpen, toggleIsDialogOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

// Create a custom hook to use the dialog context
export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider")
  }
  return context
}
