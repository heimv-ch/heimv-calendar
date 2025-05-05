import type { Occupancy, OccupancySlot } from "../model/occupancy";
import type { ReactNode } from "react";
import { MonthsCalendar } from "./MonthsCalendar";
import { YearCalendar } from "./YearCalendar";
import { CalendarStateProvider, type DateRange } from "./CalendarStateContext";

export enum CalendarMode {
	months = "months",
	year = "year",
}

export type CalendarBaseProps = {
	currentDate: Date;
	occupancies?: Map<string, OccupancySlot>;
	disableDate?: (date: Date) => boolean;
	onOccupancyClick?: (occupancy: Occupancy) => void;
	renderOccupancyPopover?: (occupancy: Occupancy) => ReactNode;
	onDateClick?: (date: Date) => void;
	getDateHref?: (date: Date) => string;
};

export type CalendarProps = Omit<CalendarBaseProps, "currentDate"> & {
	mode?: CalendarMode;
	currentDate?: Date;
	visibleMonth?: number;
	onSelectRange?: (range?: DateRange) => void;
	selectedRange?: DateRange;
};

export function Calendar({ selectedRange, onSelectRange, ...props }: CalendarProps) {
	return (
		<CalendarStateProvider selectedRange={selectedRange} setSelectedRange={onSelectRange}>
			<CalendarWrapper {...props} />
		</CalendarStateProvider>
	);
}

function CalendarWrapper({
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
