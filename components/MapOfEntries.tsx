"use client"

import { useMemo } from "react"
import dynamic from "next/dynamic"

import { MetadataReadyForMapType, MetadataType } from "@/types/MetadataType"

import "leaflet/dist/leaflet.css"
import { convertPlusCodeToLatLong } from "@/lib/convertPlusCodeToLatLong"

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false })

type MapOfEntriesProps = {
  entries?: MetadataType[]
}

export default function MapOfEntries({ entries }: MapOfEntriesProps) {
  const metadataWithFormattedAddress: MetadataReadyForMapType[] | undefined =
    useMemo(
      () =>
        entries?.map((entry) => {
          const formattedAddress = entry.metadata.plusCodeAddress
            ? convertPlusCodeToLatLong(entry.metadata.plusCodeAddress)
            : undefined

          const preparedEntry: MetadataReadyForMapType = {
            ...entry,
            metadata: {
              ...entry.metadata,
            },
            latLongAddress: formattedAddress,
          }

          return preparedEntry
        }),
      [entries]
    )

  console.log(metadataWithFormattedAddress)

  return (
    <div className="h-96 w-full">
      <LeafletMap journalEntries={metadataWithFormattedAddress} />
    </div>
  )
}
