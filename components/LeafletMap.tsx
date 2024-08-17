import { MapContainer, Marker, TileLayer } from "react-leaflet"

import "react-leaflet-marker"
import { LatLongFormat } from "@/lib/convertPlusCodeToLatLong"

type LeafletMapProps = {
  geoData?: LatLongFormat[]
}

export default function LeafletMap({ geoData }: LeafletMapProps) {
  return (
    <MapContainer
      className="size-full"
      center={[9.046036, -17.871187]}
      zoom={1.2}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData?.map((pos) => (
        <Marker position={pos} />
      ))}
    </MapContainer>
  )
}
