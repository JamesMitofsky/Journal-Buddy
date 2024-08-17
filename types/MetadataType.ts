export type MetadataType = {
  name: string
  metadata: {
    date: string
    time: string
    location: string
    plusCodeAddress: string
    page: number
    tags: string[]
    journalNumber: number
    schemaVersion: number
  }
  content: string
}
