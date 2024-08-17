// Import the decode function from the open-location-code package
// import { decode } from "open-location-code"
const { decode } = require("pluscodes")

export type LatLongFormat = {
  lat: number
  lng: number
}

// Function to convert Plus Code to latitude and longitude
export function convertPlusCodeToLatLong(plusCode: string): LatLongFormat {
  console.log(plusCode)
  const decoded = decode(plusCode)
  return {
    lat: decoded.latitudeCenter,
    lng: decoded.longitudeCenter,
  }
}
