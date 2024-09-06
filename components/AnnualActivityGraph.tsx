import Calendar, { Skeleton, ThemeInput } from "react-activity-calendar"

import { JournalMarkdownType } from "@/types/MetadataType"

export const DEFAULT_THEME = {
  light: ["#ebedf0", "#9be9a8", "#40c463"],
  dark: ["#161b22", "#0e4429", "#006d32"],
} satisfies ThemeInput

const transformDataForCalendar = (entries: JournalMarkdownType[]) => {
  return entries.map(({ metadata: { date } }) => {
    console.log(date)
    return {
      date: new Date(date).toISOString(),
      level: 1,
      count: 1,
    }
  })
}

type CalendarProps = {
  entries: JournalMarkdownType[]
}

export default function AnnualActivityGraph({ entries }: CalendarProps) {
  //   console.log(entries)
  if (entries.length === 0) {
    return <Skeleton loading />
  } else {
    return (
      <div>
        <h1>Annual Activity Graph</h1>
        <Calendar
          data={transformDataForCalendar(entries)}
          // labels={Object.assign({}, defaultLabels, labels)}
          // ref={ref}
          theme={DEFAULT_THEME}
          // totalCount={transformFn && transformTotalCount ? undefined : totalCount}
          totalCount={1}
          // {...props}
          maxLevel={2}
        />
      </div>
    )
  }
}
