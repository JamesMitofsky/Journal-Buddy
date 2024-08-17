"use client"

import { useState } from "react"

import { MetadataType } from "@/types/MetadataType"
import { getMarkdownData } from "@/lib/getMarkdownData"
import { parseMarkdown } from "@/lib/parseMarkdown"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
    <div className="flex h-full flex-col items-center justify-center space-y-8 p-4">
      <div className="w-full max-w-4xl">
        <h2 className="mb-4 text-2xl font-semibold">Journal Entries</h2>
        <Table className="w-full border-collapse">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="p-4 text-left">Name</TableHead>
              <TableHead className="p-4 text-left">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {journalEntries.map(({ name, metadata }, index) => (
              <TableRow key={index} className="border-b">
                <TableCell className="p-4 font-medium">{name}</TableCell>
                <TableCell className="p-4">
                  {new Date(metadata.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="p-4">
                  {metadata?.tags &&
                    metadata.tags.map((tag) => (
                      <Badge variant="outline">{tag}</Badge>
                    ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button
        className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
        onClick={handleFolderSelection}
      >
        Select Folder
      </Button>
    </div>
  )
}
