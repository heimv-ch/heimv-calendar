import { addMonths, eachMonthOfInterval, formatISO } from "date-fns";
import type { Occupancy, OccupancySlot } from "../model/occupancy";
import { CalendarMonth } from "./CalendarMonth";
import { defaults } from "../config";
import type { ReactNode } from "react";

export type CalendarProps = {
	currentDate?: Date;
	occupancies?: Map<string, OccupancySlot>;
	onDateClick?: (date: Date) => void;
	getDateHref?: (date: Date) => string;
	onOccupancyClick?: (occupancy: Occupancy) => void;
	renderOccupancyPopover?: (occupancy: Occupancy) => ReactNode;
	visibleMonth?: number;
};

export function Calendar({
	currentDate = new Date(),
	visibleMonth,
	occupancies,
	onDateClick,
	getDateHref,
	onOccupancyClick,
	renderOccupancyPopover,
}: CalendarProps) {
	return (
		<div className="calendar">
			<div className="months-calendar">
				<div className="months">
					{eachMonthOfInterval({
						start: currentDate,
						end: addMonths(currentDate, (visibleMonth ?? defaults.visibleMonths) - 1),
					}).map((date) => {
						const dateString = formatISO(date, { representation: "date" });
						return (
							<CalendarMonth
								occupancies={occupancies}
								dateString={dateString}
								key={dateString}
								onDateClick={onDateClick}
								getDateHref={getDateHref}
								onOccupancyClick={onOccupancyClick}
								renderOccupancyPopover={renderOccupancyPopover}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
