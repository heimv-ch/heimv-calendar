import { addMonths, eachMonthOfInterval, formatISO } from "date-fns";
import { useMemo } from "react";
import { defaults } from "../config";
import type { CalendarBaseProps } from "./Calendar";
import { CalendarMonth } from "./CalendarMonth";

type MonthsCalendarProps<O> = CalendarBaseProps<O> & {
  visibleMonths?: number;
};

export function MonthsCalendar<O>({ visibleMonths, firstDate, ...props }: MonthsCalendarProps<O>) {
  const months = useMemo(
    () =>
      eachMonthOfInterval({
        start: firstDate,
        end: addMonths(firstDate, (visibleMonths ?? defaults.visibleMonths) - 1),
      }),
    [firstDate, visibleMonths],
  );

  return (
    <div className="months-calendar">
      {months.map((date) => {
        const isoDate = formatISO(date, { representation: "date" });

        return <CalendarMonth by="week" key={isoDate} date={date} firstDate={firstDate} {...props} />;
      })}
    </div>
  );
}
