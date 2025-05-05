import { addMonths, eachMonthOfInterval, formatISO } from "date-fns";
import { CalendarMonth } from "./CalendarMonth";
import type { CalendarBaseProps } from "./Calendar";

type YearCalendarProps = CalendarBaseProps;

export function YearCalendar(props: YearCalendarProps) {
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
				const dateString = formatISO(date, { representation: "date" });
				return <CalendarMonth by="day" dateString={dateString} key={dateString} {...props} />;
			})}
		</div>
	);
}
