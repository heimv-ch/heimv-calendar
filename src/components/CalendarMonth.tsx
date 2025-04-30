import { eachDayOfInterval, endOfMonth, formatISO, getDay, parseISO, startOfMonth } from "date-fns";
import { CalendarDate, type CalendarDateProps } from "./CalendarDate";
import type { Occupancy, OccupancySlot } from "../model/occupancy";
import type { ReactNode } from "react";
import { formatMonth, formattedWeekdays } from "../helper/format";

type CalendarMonthProps = {
	dateString: string;
	by: "week" | "day";
	occupancies?: Map<string, OccupancySlot>;
	onDateClick?: (date: Date) => void;
	getDateHref?: (date: Date) => string;
	onOccupancyClick?: (occupancy: Occupancy) => void;
	renderOccupancyPopover?: (occupancy: Occupancy) => ReactNode;
};

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
						<h3>{formatMonth(monthStart)}</h3>
						<div className="weekdays">
							{[...Array(7).keys()].map((day) => (
								<div key={`weekday-${day}`}>{formattedWeekdays[day]}</div>
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
					<div className="month-label">{formatMonth(monthStart)}</div>

					{eachDayOfInterval({ start: monthStart, end: endOfMonth(monthStart) }).map((date) => (
						<CalendarDate
							key={date.toISOString()}
							renderLabel={() => formattedWeekdays[(getDay(date) + 6) % 7]}
							{...getCommonCalendarDateProps(date)}
						/>
					))}
				</>
			)}
		</div>
	);
}
