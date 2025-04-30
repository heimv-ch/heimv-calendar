import type { Occupancy, OccupancySlot } from "../model/occupancy";
import type { ReactNode } from "react";
import { MonthsCalendar } from "./MonthsCalendar";
import { YearCalendar } from "./YearCalendar";

export enum CalendarMode {
	months = "months",
	year = "year",
}

export type CalendarBaseProps = {
	occupancies?: Map<string, OccupancySlot>;
	disableDate?: (date: Date) => boolean;
	onDateClick?: (date: Date) => void;
	getDateHref?: (date: Date) => string;
	onOccupancyClick?: (occupancy: Occupancy) => void;
	renderOccupancyPopover?: (occupancy: Occupancy) => ReactNode;
};

export type CalendarProps = CalendarBaseProps & {
	mode?: CalendarMode;
	currentDate?: Date;
	visibleMonth?: number;
};

export function Calendar({
	currentDate = new Date(),
	mode = CalendarMode.months,
	visibleMonth,
	...calendarBaseProps
}: CalendarProps) {
	const commonCalendarProps = { currentDate, ...calendarBaseProps };

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
