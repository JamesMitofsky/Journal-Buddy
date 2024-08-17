"use client"

import { useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"

import { MetadataType } from "@/types/MetadataType"
import {
  LatLongFormat,
  convertPlusCodeToLatLong,
} from "@/lib/convertPlusCodeToLatLong"

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

  // const fakeData: LatLongFormat[] = [
  //   { lat: 37.7749, lng: -122.4194 },
  //   { lat: 37.7749, lng: -122.4194 },
  // ]
  const [fakeData, setData] = useState<LatLongFormat[]>([
    { lat: 37.7749, lng: -122.4194 },
    { lat: 37.7749, lng: -122.4194 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const newLat = 37.7749 + Math.random() * 0.1 - 0.05 // Random latitude around the initial value
      const newLng = -122.4194 + Math.random() * 0.1 - 0.05 // Random longitude around the initial value
      const newEntry = { lat: newLat, lng: newLng }

      setData((prevData) => [...prevData, newEntry])
    }, 1000)

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [])

  return (
    <div className="h-96 w-full">
      <LeafletMap geoData={fakeData} />
    </div>
  )
}
