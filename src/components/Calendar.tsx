import type { Occupancy, OccupancySlot } from "../model/occupancy";
import type { ReactNode } from "react";
import { MonthsCalendar } from "./MonthsCalendar";
import { YearCalendar } from "./YearCalendar";

export enum CalendarMode {
	months = "months",
	year = "year",
}

export type CalendarBaseProps = {
	currentDate: Date;
	occupancies?: Map<string, OccupancySlot>;
	onDateClick?: (date: Date) => void;
	getDateHref?: (date: Date) => string;
	onOccupancyClick?: (occupancy: Occupancy) => void;
	renderOccupancyPopover?: (occupancy: Occupancy) => ReactNode;
};

export type CalendarProps = Omit<CalendarBaseProps, "currentDate"> & {
	mode?: CalendarMode;
	currentDate?: Date;
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
	const commonCalendarProps: CalendarBaseProps = {
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
			case CalendarMode.year:
				return <YearCalendar {...commonCalendarProps} />;
			default:
				break;
		}
	};

	return <div className="calendar">{renderCalendar()}</div>;
}
