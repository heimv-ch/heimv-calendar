import { eachDayOfInterval, endOfMonth, format, formatISO, getDay, parseISO, startOfMonth } from "date-fns";
import { CalendarDate, type CalendarDateProps } from "./CalendarDate";
import type { Occupancy, OccupancySlot } from "../model/occupancy";
import type { ReactNode } from "react";

type CalendarMonthProps = {
	dateString: string;
	by: "week" | "day";
	occupancies?: Map<string, OccupancySlot>;
	onDateClick?: (date: Date) => void;
	getDateHref?: (date: Date) => string;
	onOccupancyClick?: (occupancy: Occupancy) => void;
	renderOccupancyPopover?: (occupancy: Occupancy) => ReactNode;
};

// Handle localization
const weekdayShortNames = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"] as const;

export function CalendarMonth({
	dateString,
	by,
	occupancies,
	onDateClick,
	getDateHref,
	onOccupancyClick,
	renderOccupancyPopover,
}: CalendarMonthProps) {
	const monthStart = startOfMonth(parseISO(dateString));
	const monthStartsAfter = (getDay(monthStart) + 6) % 7;

	const getCommonCalendarDateProps = (date: Date): CalendarDateProps => {
		const dateString = formatISO(date, { representation: "date" });

		return {
			dateString: dateString,
			onClick: onDateClick,
			href: getDateHref?.(date),
			occupancySlot: occupancies?.get(dateString),
			onClickOccupancy: onOccupancyClick,
			renderOccupancyPopover: renderOccupancyPopover,
		};
	};

	return (
		<div className="month">
			{by === "week" ? (
				<>
					<header>
						{/* Handle localization */}
						<h3>{format(monthStart, "MMMM")}</h3>
						<div className="weekdays">
							{[...Array(7).keys()].map((day) => (
								<div key={`weekday-${day}`}>{weekdayShortNames[day]}</div>
							))}
						</div>
					</header>
					<div className="dates">
						<div style={{ gridColumn: `span ${monthStartsAfter}` }} />

						{eachDayOfInterval({ start: monthStart, end: endOfMonth(monthStart) }).map((date) => (
							<CalendarDate key={date.toISOString()} {...getCommonCalendarDateProps(date)} />
						))}
					</div>
				</>
			) : (
				<>
					<div className="month-label">{format(monthStart, "MMMM")}</div>

					{eachDayOfInterval({ start: monthStart, end: endOfMonth(monthStart) }).map((date) => {
						const weekdayName = weekdayShortNames[(getDay(date) + 6) % weekdayShortNames.length];

						return (
							<CalendarDate
								key={date.toISOString()}
								renderLabel={() => weekdayName}
								{...getCommonCalendarDateProps(date)}
							/>
						);
					})}
				</>
			)}
		</div>
	);
}
