import type { Occupancy, OccupancySlot } from "../model/occupancy";
import type { ReactNode } from "react";
import { MonthsCalendar } from "./MonthsCalendar";

export enum CalendarMode {
	months = "months",
	year = "year",
}

export type CalendarProps = {
	currentDate?: Date;
	mode?: CalendarMode;
	occupancies?: Map<string, OccupancySlot>;
	onDateClick?: (date: Date) => void;
	getDateHref?: (date: Date) => string;
	onOccupancyClick?: (occupancy: Occupancy) => void;
	renderOccupancyPopover?: (occupancy: Occupancy) => ReactNode;
	visibleMonth?: number;
};

export function Calendar({
	currentDate = new Date(),
	mode = CalendarMode.months,
	visibleMonth,
	occupancies,
	onDateClick,
	getDateHref,
	onOccupancyClick,
	renderOccupancyPopover,
}: CalendarProps) {
	const commonCalendarProps = {
		currentDate,
		occupancies,
		onDateClick,
		getDateHref,
		onOccupancyClick,
		renderOccupancyPopover,
	};

	const renderCalendar = () => {
		switch (mode) {
			case CalendarMode.months:
				return <MonthsCalendar {...commonCalendarProps} visibleMonths={visibleMonth} />;
			default:
				break;
		}
	};

	return <div className="calendar">{renderCalendar()}</div>;
}
