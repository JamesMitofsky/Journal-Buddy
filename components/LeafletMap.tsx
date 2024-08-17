import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

import "react-leaflet-marker"
import { MetadataReadyForMapType } from "@/types/MetadataType"

type LeafletMapProps = {
  journalEntries: MetadataReadyForMapType[] | undefined
}

export default function LeafletMap({ journalEntries }: LeafletMapProps) {
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
      {journalEntries?.map(
        ({ name, latLongAddress }) =>
          latLongAddress && (
            <Marker position={latLongAddress} key={name}>
              <Popup>{name}</Popup>
            </Marker>
          )
      )}
    </MapContainer>
  )
}
