export type JournalMarkdownType = {
  name: string
  metadata: {
    date: string
    time?: string
    location?: string
    latLongAddress?: string
    page: number
    tags?: string[]
    journalNumber: number
    schemaVersion: number
  }
  content: string
}
