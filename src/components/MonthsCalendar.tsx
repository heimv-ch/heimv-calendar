import { addMonths, eachMonthOfInterval, formatISO } from "date-fns";
import type { Occupancy, OccupancySlot } from "../model/occupancy";
import type { ReactNode } from "react";
import { CalendarMonth } from "./CalendarMonth";
import { defaults } from "../config";

interface MonthsCalendarProps {
	currentDate: Date;
	visibleMonths?: number;
	occupancies?: Map<string, OccupancySlot>;
	onDateClick?: (date: Date) => void;
	getDateHref?: (date: Date) => string;
	onOccupancyClick?: (occupancy: Occupancy) => void;
	renderOccupancyPopover?: (occupancy: Occupancy) => ReactNode;
}

export function MonthsCalendar({
	currentDate,
	visibleMonths,
	occupancies,
	onDateClick,
	getDateHref,
	onOccupancyClick,
	renderOccupancyPopover,
}: MonthsCalendarProps) {
	return (
		<div className="months-calendar">
			{eachMonthOfInterval({
				start: currentDate,
				end: addMonths(currentDate, (visibleMonths ?? defaults.visibleMonths) - 1),
			}).map((date) => {
				const dateString = formatISO(date, { representation: "date" });

				return (
					<CalendarMonth
						key={dateString}
						dateString={dateString}
						occupancies={occupancies}
						onDateClick={onDateClick}
						getDateHref={getDateHref}
						onOccupancyClick={onOccupancyClick}
						renderOccupancyPopover={renderOccupancyPopover}
					/>
				);
			})}
		</div>
	);
}
