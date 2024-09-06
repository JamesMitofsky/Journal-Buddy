"use client"

import { useMemo } from "react"
import Calendar, {
  Activity,
  Skeleton,
  ThemeInput,
} from "react-activity-calendar"

import { JournalMarkdownType } from "@/types/MetadataType"

export const DEFAULT_THEME = {
  light: ["#ebedf0", "#9be9a8", "#40c463"],
  dark: ["#161b22", "#0e4429", "#006d32"],
} satisfies ThemeInput

const transformDataForCalendar = (
  entries: JournalMarkdownType[]
): Activity[] => {
  const dateToLevelMap = entries.reduce((map, { metadata: { date } }) => {
    const isoDate = new Date(date).toISOString()

    // if there is no matching date, it returns 0 to initialize the count, and then no matter what 1 is added
    map.set(isoDate, (map.get(isoDate) || 0) + 1)

    return map
  }, new Map<string, number>())

  const dateFormattedEntries = Array.from(dateToLevelMap, ([date, level]) => ({
    date: date.substring(0, 10),
    level,
    count: 1,
  }))

  console.log(dateFormattedEntries)

  // get dates to wrap the entries, making the calendar a full year
  const year = new Date(entries[0].metadata.date).getFullYear()
  const startOfYear = new Date(year, 0, 1).toISOString().substring(0, 10)
  const endOfYear = new Date(year, 11, 31).toISOString().substring(0, 10)

  return [
    { date: startOfYear, level: 0, count: 0 },
    ...dateFormattedEntries,
    { date: endOfYear, level: 0, count: 0 },
  ]
}

type CalendarProps = {
  entries: JournalMarkdownType[]
}

export default function AnnualActivityGraph({ entries }: CalendarProps) {
  const entriesForCalendar = useMemo(
    () => transformDataForCalendar(entries),
    [entries]
  )
  const totalCount = useMemo(() => entries.length, [entries])

  // console.log(entriesForCalendar)

  if (entries.length === 0) {
    return <Skeleton loading />
  } else {
    return (
      <div>
        <h1>Annual Activity Graph</h1>
        <Calendar
          data={entriesForCalendar}
          // labels={Object.assign({}, defaultLabels, labels)}
          // ref={ref}
          theme={DEFAULT_THEME}
          totalCount={totalCount}
          labels={{
            totalCount: "{{count}} journal entries in {{year}}",
          }}
          maxLevel={2}
          // start the week on monday
          weekStart={1}
        />
      </div>
    )
  }
}
