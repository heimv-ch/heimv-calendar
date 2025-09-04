import { addMonths, eachMonthOfInterval, formatISO } from "date-fns";
import { CalendarMonth } from "./CalendarMonth";
import { defaults } from "../config";
import type { CalendarBaseProps } from "./Calendar";

type MonthsCalendarProps<O> = CalendarBaseProps<O> & {
  visibleMonths?: number;
};

export function MonthsCalendar<O>({ visibleMonths, ...props }: MonthsCalendarProps<O>) {
  return (
    <div className="months-calendar">
      {eachMonthOfInterval({
        start: props.firstDate,
        end: addMonths(props.firstDate, (visibleMonths ?? defaults.visibleMonths) - 1),
      }).map((date) => {
        const isoDate = formatISO(date, { representation: "date" });

        return <CalendarMonth by="week" key={isoDate} isoDate={isoDate} {...props} />;
      })}
    </div>
  );
}
