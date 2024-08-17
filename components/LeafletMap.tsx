import { MapPin } from "lucide-react"
import { MapContainer, TileLayer } from "react-leaflet"
import { Marker, MarkerLayer } from "react-leaflet-marker"

import { LatLongFormat } from "@/lib/convertPlusCodeToLatLong"

type LeafletMapProps = {
  geoData?: LatLongFormat[]
}

const fakeData = [
  { lat: 37.7749, lng: -122.4194 },
  { lat: 37.7749, lng: -122.4194 },
]

export default function LeafletMap({ geoData }: LeafletMapProps) {
  return (
    <MapContainer
      className="size-full"
      center={fakeData ? fakeData[0] : [0, 0]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {fakeData?.map((pos) => (
        <MarkerLayer>
          <Marker position={pos}>
            <MapPin />
          </Marker>
        </MarkerLayer>
      ))}
    </MapContainer>
  )
}
