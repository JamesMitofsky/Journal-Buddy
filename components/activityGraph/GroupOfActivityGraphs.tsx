import { Skeleton } from "react-activity-calendar"

import { JournalMarkdownType } from "@/types/MetadataType"

import AnnualActivityGraph from "./AnnualActivityGraph"

type GroupOfActivityGraphsProps = {
  entries: JournalMarkdownType[]
}

export default function GroupOfActivityGraphs({
  entries,
}: GroupOfActivityGraphsProps) {
  const entriesGroupedByYear = entries.reduce<
    Map<number, JournalMarkdownType[]>
  >((acc, entry) => {
    const year = new Date(entry.metadata.date).getFullYear()
    if (acc.has(year)) {
      acc.get(year)!.push(entry) // is there a way to avoid forcing the type with "!"
    } else {
      acc.set(year, [entry])
    }
    return acc
  }, new Map<number, JournalMarkdownType[]>())

  if (entries.length === 0) {
    return <Skeleton loading />
  } else {
    return (
      <div>
        <h1 className="font-bold">Groups of Activity Graph</h1>
        {Array.from(entriesGroupedByYear.entries()).map(
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
