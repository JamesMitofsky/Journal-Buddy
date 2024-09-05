"use client"

import { useState } from "react"

import { JournalMarkdownType } from "@/types/MetadataType"
import { getMarkdownData } from "@/lib/getMarkdownData"
import { parseMarkdown } from "@/lib/parseMarkdown"
import { Spinner } from "@/components/ui/Spinner"
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
import MapOfEntries from "@/components/MapOfEntries"

const extractHashtags = (content: string) => {
  const hashtagPattern = /#\w+/g
  const matches = content.match(hashtagPattern)
  return matches || []
}

export default function FolderPicker() {
  const [journalEntries, setJournalEntries] = useState<JournalMarkdownType[]>(
    []
  )
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleFolderSelection = async () => {
    setIsLoading(true)
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
    setIsLoading(false)
  }

  return (
    <>
      <div className="flex justify-between gap-3">
        <h1 className="text-2xl font-semibold">Visualize</h1>
        <Button
          className="rounded-md px-6 py-2"
          onClick={handleFolderSelection}
        >
          {isLoading ? <Spinner className="text-white" /> : "Select Folder"}
        </Button>
      </div>
      <MapOfEntries entries={journalEntries} />
      <Table className="w-full border-collapse">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="p-4 text-left">Name</TableHead>
            <TableHead className="p-4 text-left">Date</TableHead>
            <TableHead className="p-4 text-left">Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {journalEntries.map(({ name, metadata, content }, index) => {
            const tagsInsideContent = extractHashtags(content)
            const allTags = [...tagsInsideContent, ...(metadata?.tags || [])]

            return (
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
                  {allTags.map((tag) => (
                    <Badge variant="outline">{tag}</Badge>
                  ))}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
