const OpenLocationCode = require("open-location-code").OpenLocationCode
const openLocationCode = new OpenLocationCode()

export type LatLongFormat = {
  lat: number
  lng: number
}

export function convertPlusCodeToLatLong(
  plusCode: string
): LatLongFormat | undefined {
  try {
    const decoded = openLocationCode.decode(plusCode)
    return {
      lat: decoded.latitudeCenter,
      lng: decoded.longitudeCenter,
    }
  } catch (e) {
    console.error(e)
    return
  }
}
