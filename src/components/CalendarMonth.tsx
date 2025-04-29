import { eachDayOfInterval, endOfMonth, format, formatISO, getDay, parseISO, startOfMonth } from "date-fns";
import { CalendarDate } from "./CalendarDate";
import type { Occupancy, OccupancySlot } from "../model/occupancy";

interface CalendarMonthProps {
	dateString: string;
	occupancies?: Map<string, OccupancySlot>;
	onDateClick?: (date: Date) => void;
	onOccupancyClick?: (occupancy: Occupancy) => void;
}

// Handle localization
const weekdayShortNames = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"] as const;

export function CalendarMonth({ dateString, occupancies, onDateClick, onOccupancyClick }: CalendarMonthProps) {
	const date = startOfMonth(parseISO(dateString));
	const monthStartsAfter = (getDay(date) + 6) % 7;

	return (
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
						<CalendarDate
							occupancySlot={occupancies?.get(dateString)}
							dateString={dateString}
							onClick={onDateClick}
							onClickOccupancy={onOccupancyClick}
							key={dateString}
						/>
					);
				})}
			</div>
		</div>
	);
}
