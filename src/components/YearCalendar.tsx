import { addMonths, eachMonthOfInterval, formatISO } from "date-fns";
import { CalendarMonth } from "./CalendarMonth";
import type { CalendarBaseProps } from "./Calendar";

type YearCalendarProps = CalendarBaseProps & {
	currentDate: Date;
};

export function YearCalendar({ currentDate, ...rest }: YearCalendarProps) {
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

			{eachMonthOfInterval({ start: currentDate, end: addMonths(currentDate, 11) }).map((date) => {
				const dateString = formatISO(date, { representation: "date" });
				return <CalendarMonth by="day" dateString={dateString} key={dateString} {...rest} />;
			})}
		</div>
	);
}
