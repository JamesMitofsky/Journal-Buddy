"use client"

import { useState } from "react"

import { MetadataType } from "@/types/MetadataType"
import { getMarkdownData } from "@/lib/getMarkdownData"
import { parseMarkdown } from "@/lib/parseMarkdown"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function FolderPicker() {
  const [journalEntries, setJournalEntries] = useState<MetadataType[]>([])
  const { toast } = useToast()

  const handleFolderSelection = async () => {
    try {
      // Request access to the folder
      const directoryHandle = await window.showDirectoryPicker()
      const files = await getMarkdownData(directoryHandle)

      console.log(files)

      const parsedData = files.map((file) => parseMarkdown(file))

      console.log(parsedData)

      setJournalEntries(parsedData)

      toast({
        title: "Success",
        description: "The files have been retrieved.",
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error accessing or parsing the files.",
        variant: "error",
      })
      console.error("Error accessing folder:", error)
    }
  }

  return (
    <div className="align-center flex h-full justify-center">
      <Button onClick={handleFolderSelection}>Select Folder</Button>

      <h3>Journal Entries:</h3>
      <ul>
        {journalEntries.map((entry, index) => (
          <li key={index}>{entry.name}</li>
        ))}
      </ul>
    </div>
  )
}
