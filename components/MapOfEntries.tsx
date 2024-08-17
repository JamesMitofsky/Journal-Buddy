"use client"

import { useMemo } from "react"
import dynamic from "next/dynamic"

import { MetadataType } from "@/types/MetadataType"
import { convertPlusCodeToLatLong } from "@/lib/convertPlusCodeToLatLong"

import "leaflet/dist/leaflet.css"

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false })

type MapOfEntriesProps = {
  entries?: MetadataType[]
}

export default function MapOfEntries({ entries }: MapOfEntriesProps) {
  const formattedLocations = useMemo(() => {
    return entries?.map((entry) =>
      convertPlusCodeToLatLong(entry.metadata.plusCodeAddress)
    )
  }, [entries])

  return (
    <div className="h-96 w-full">
      <LeafletMap geoData={formattedLocations} />
    </div>
  )
}
