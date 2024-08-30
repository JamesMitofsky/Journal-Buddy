import { LatLngExpression } from "leaflet"

export default function formatForLeafletMap(latLong: string): LatLngExpression {
  const [lat, lng] = latLong.split(",").map((coord) => parseFloat(coord.trim()))
  return {
    lat,
    lng,
  }
}
