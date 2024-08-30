// https://www.google.com/maps?q=latitude,longitude
export default function createGoogleMapsLatLongUrl(latLongAddress: string) {
  const formattedLatLong = latLongAddress.replace(/^\(|\)|\s/g, "")
  return `https://www.google.com/maps?q=${formattedLatLong}`
}
