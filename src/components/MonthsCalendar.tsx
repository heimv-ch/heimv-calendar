import { addMonths, eachMonthOfInterval, formatISO } from "date-fns";
import { CalendarMonth } from "./CalendarMonth";
import { defaults } from "../config";
import type { CalendarBaseProps } from "./Calendar";

type MonthsCalendarProps = CalendarBaseProps & {
	visibleMonths?: number;
};

export function MonthsCalendar({ currentDate, visibleMonths, ...rest }: MonthsCalendarProps) {
	return (
		<div className="months-calendar">
			{eachMonthOfInterval({
				start: currentDate,
				end: addMonths(currentDate, (visibleMonths ?? defaults.visibleMonths) - 1),
			}).map((date) => {
				const dateString = formatISO(date, { representation: "date" });

				return <CalendarMonth by="week" key={dateString} dateString={dateString} {...rest} />;
			})}
		</div>
	);
}
