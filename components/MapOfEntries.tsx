"use client"

import dynamic from "next/dynamic"

import { JournalMarkdownType } from "@/types/MetadataType"

import "leaflet/dist/leaflet.css"

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false })

type MapOfEntriesProps = {
  entries?: JournalMarkdownType[]
}

export default function MapOfEntries({ entries }: MapOfEntriesProps) {
  return (
    <div className="h-96 w-full">
      <LeafletMap journalEntries={entries} />
    </div>
  )
}
