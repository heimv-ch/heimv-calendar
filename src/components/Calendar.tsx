import type { Occupancy, OccupancySlot } from "../model/occupancy";
import type { ReactNode } from "react";
import { MonthsCalendar } from "./MonthsCalendar";
import { YearCalendar } from "./YearCalendar";
import { CalendarStateProvider, type DateRange } from "./CalendarStateContext";

export enum CalendarViewMode {
	months = "months",
	year = "year",
}

export type CalendarMode = "view" | "interactive" | "range";

type CalendarClickableProps = {
	mode: "interactive";
	onOccupancyClick?: (occupancy: Occupancy) => void;
	onDateClick?: (date: Date) => void;
	getDateHref?: (date: Date) => string;
};

type CalendarRangeSelectProps = {
	mode: "range";
	onSelectRange?: (range: DateRange) => void;
	selectedRange?: DateRange;
};

type CalendarModeProps = CalendarClickableProps | CalendarRangeSelectProps | { mode: "view" };

export type CalendarBaseProps = {
	firstDate: Date;
	occupancies?: Map<string, OccupancySlot>;
	disableDate?: (date: Date) => boolean;
	renderOccupancyPopover?: (occupancy: Occupancy) => ReactNode;
} & CalendarModeProps;

export type CalendarProps<M extends CalendarMode> = CalendarBaseProps & {
	mode?: M;
	viewMode?: CalendarViewMode;
	visibleMonth?: number;
} & CalendarModeProps;

export function Calendar<M extends CalendarMode = "view">(props: CalendarProps<M>) {
	const { viewMode = CalendarViewMode.months, visibleMonth, firstDate = new Date(), ...calendarBaseProps } = props;

	const commonCalendarProps = { firstDate, ...calendarBaseProps };

	const renderCalendar = () => {
		switch (viewMode) {
			case CalendarViewMode.months:
				return <MonthsCalendar {...commonCalendarProps} visibleMonths={visibleMonth} />;
			case CalendarViewMode.year:
				return <YearCalendar {...commonCalendarProps} />;
			default:
				break;
		}
	};

	return (
		<CalendarStateProvider
			selectedRange={props.mode === "range" ? (props as CalendarRangeSelectProps).selectedRange : undefined}
			setSelectedRange={props.mode === "range" ? (props as CalendarRangeSelectProps).onSelectRange : undefined}
		>
			<div className="calendar">{renderCalendar()}</div>
		</CalendarStateProvider>
	);
}

Calendar.defaultProps = { mode: "view", firstDate: new Date() };
