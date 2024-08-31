import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

import "react-leaflet-marker"
import L from "leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"

import { JournalMarkdownType } from "@/types/MetadataType"
import formatForLeafletMap from "@/lib/formatForLeafletMap"

const customIcon = new L.Icon({
  iconUrl: "./location.svg",
  iconSize: new L.Point(40, 47),
})

type LeafletMapProps = {
  journalEntries: JournalMarkdownType[] | undefined
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
      {journalEntries && (
        <MarkerClusterGroup chunkedLoading>
          {journalEntries.map(
            ({ name, metadata: { latLongAddress } }) =>
              latLongAddress && (
                <Marker
                  position={formatForLeafletMap(latLongAddress)}
                  key={name}
                  icon={customIcon}
                >
                  <Popup>{name}</Popup>
                </Marker>
              )
          )}
        </MarkerClusterGroup>
      )}
    </MapContainer>
  )
}
