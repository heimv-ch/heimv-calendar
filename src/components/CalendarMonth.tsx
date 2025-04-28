import { eachDayOfInterval, endOfMonth, format, formatISO, getDate, getDay, parseISO, startOfMonth } from "date-fns";
import { CalendarDate } from "./CalendarDate";

interface CalendarMonthProps {
	dateString: string;
}

// Handle localization
const weekdayShortNames = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"] as const;

export function CalendarMonth({ dateString }: CalendarMonthProps) {
	const date = startOfMonth(parseISO(dateString));
	const monthStartsAfter = (getDay(date) + 6) % 7;

	console.log([...Array(7).keys()]);

	return (
		<div className="months-calendar">
			<div className="months">
				<div className="month">
					<header>
						{/* Handle localization */}
						<h3>{format(date, "MMMM")}</h3>
						<div className="weekdays">
							{[...Array(7).keys()].map((day) => (
								<div key={`weekday-${day}`}>{weekdayShortNames[day]}</div>
							))}
						</div>
					</header>
					<div className="dates">
						<div style={{ gridColumn: `span ${monthStartsAfter}` }} />

						{eachDayOfInterval({ start: date, end: endOfMonth(date) }).map((date) => {
							const dateString = formatISO(date, { representation: "date" });

							return (
								<CalendarDate dateString={dateString} key={dateString}>
									{getDate(date).toString()}
								</CalendarDate>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
