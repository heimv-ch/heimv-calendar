import { addMonths, eachMonthOfInterval, formatISO } from "date-fns";
import type { CalendarBaseProps } from "./Calendar";
import { CalendarMonth } from "./CalendarMonth";

type YearCalendarProps<O> = CalendarBaseProps<O>;

export function YearCalendar<O>(props: YearCalendarProps<O>) {
  return (
    <div className="year-calendar">
      <header className="month">
        <div />
        {[...Array(31).keys()].map((n) => (
          <div className="day-of-month" key={n}>
            {n + 1}.
          </div>
        ))}
      </header>

      {eachMonthOfInterval({ start: props.firstDate, end: addMonths(props.firstDate, 11) }).map((date) => {
        const isoDate = formatISO(date, { representation: "date" });
        return <CalendarMonth by="day" isoDate={isoDate} key={isoDate} {...props} />;
      })}
    </div>
  );
}
