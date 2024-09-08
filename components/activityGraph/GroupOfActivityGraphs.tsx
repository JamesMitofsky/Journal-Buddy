import { useMemo } from "react"

import { JournalMarkdownType } from "@/types/MetadataType"

import AnnualActivityGraph from "./AnnualActivityGraph"

type GroupOfActivityGraphsProps = {
  entries: JournalMarkdownType[]
}

export default function GroupOfActivityGraphs({
  entries,
}: GroupOfActivityGraphsProps) {
  const entriesGroupedByYear = useMemo(() => {
    return entries.reduce<Map<number, JournalMarkdownType[]>>((acc, entry) => {
      const year = new Date(entry.metadata.date).getFullYear()
      if (acc.has(year)) {
        acc.get(year)!.push(entry) // is there a way to avoid forcing the type with "!"
      } else {
        acc.set(year, [entry])
      }
      return acc
    }, new Map<number, JournalMarkdownType[]>())
  }, [entries])

  const sortedEntriesGroupedByYear = useMemo(() => {
    return new Map(
      Array.from(entriesGroupedByYear.entries()).sort((a, b) => b[0] - a[0])
    )
  }, [entriesGroupedByYear])

  if (entries.length === 0) {
    return null
  } else {
    return (
      <div className="align-center flex flex-col">
        {Array.from(sortedEntriesGroupedByYear.entries()).map(
          ([year, yearEntries]) => (
            <div className="mt-10" key={year}>
              <h2>{year}</h2>
              <AnnualActivityGraph entries={yearEntries} />
            </div>
          )
        )}
      </div>
    )
  }
}
