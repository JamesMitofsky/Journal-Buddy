import matter from "gray-matter"

import { EntryFileType } from "@/types/EntryFileType"
import { JournalMarkdownType } from "@/types/MetadataType"

type OriginalMarkdownData = {
  Date: string
  Time: string
  Location: string
  "Latitude, Longitude": string
  Page: number
  Tags: string[]
  "Journal Number": number
  "Schema Version": number
}

export const parseMarkdown = ({ content, name }: EntryFileType) => {
  const { data: metadata, content: markdownContent } = matter(content)

  const formattedMetadata = convertMetadataToCamelCase(
    metadata as OriginalMarkdownData
  )

  const formattedName = name.replace(".md", "")

  return {
    name: formattedName,
    metadata: formattedMetadata,
    content: markdownContent,
  }
}

// TODO: ultimately remove this for more stable development connected to schemas. This just allows for data to be returned without additional formatting for the moment.
function normalizeKeys(obj: Record<string, any>): Record<string, any> {
  const normalizedObj: Record<string, any> = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      normalizedObj[key.toLowerCase()] = obj[key]
    }
  }
  return normalizedObj
}

function convertMetadataToCamelCase(
  originalData: OriginalMarkdownData
): JournalMarkdownType["metadata"] {
  const normalizedData = normalizeKeys(originalData)

  return {
    date: normalizedData["date"],
    time: normalizedData["time"],
    location: normalizedData["location"],
    latLongAddress: normalizedData["latitude, longitude"],
    page: normalizedData["page"],
    tags: normalizedData["tags"],
    journalNumber: normalizedData["journal number"],
    schemaVersion: normalizedData["schema version"],
  }
}
