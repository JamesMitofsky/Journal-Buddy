import React from "react"
import { MapPin } from "lucide-react"
import { MapContainer, TileLayer } from "react-leaflet"
import { Marker, MarkerLayer } from "react-leaflet-marker"

import { LatLongFormat } from "@/lib/convertPlusCodeToLatLong"

type LeafletMapProps = {
  geoData?: LatLongFormat[]
}

const fakeData: LatLongFormat[] = [
  { lat: 37.7749, lng: -122.4194 },
  { lat: 37.7749, lng: -122.4194 },
]

function LocationMarkers({ markers }: { markers?: LatLongFormat[] }) {
  return (
    <React.Fragment>
      {markers?.map((marker) => (
        <MarkerLayer>
          <Marker position={marker}>
            <MapPin />
          </Marker>
        </MarkerLayer>
      ))}
    </React.Fragment>
  )
}

export default function LeafletMap({ geoData }: LeafletMapProps) {
  return (
    <MapContainer
      className="size-full"
      center={geoData ? geoData[0] : [0, 0]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {fakeData?.map((pos) => (
        <MarkerLayer>
          <Marker position={pos}>
            <MapPin />
          </Marker>
        </MarkerLayer>
      ))} */}
      <LocationMarkers markers={geoData} />
    </MapContainer>
  )
}
