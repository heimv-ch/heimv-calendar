import {
	eachDayOfInterval,
	endOfMonth,
	formatISO,
	getDay,
	isSameDay,
	isWithinInterval,
	parseISO,
	startOfMonth,
} from "date-fns";
import { CalendarDate, type CalendarDateProps } from "./CalendarDate";
import { formatMonth, formattedWeekdays } from "../helper/format";
import type { CalendarBaseProps } from "./Calendar";
import { CalendarStateContext, type DateRange } from "./CalendarStateContext";
import { use } from "react";

type CalendarMonthProps = CalendarBaseProps & {
	dateString: string;
	by: "week" | "day";
};

const shouldHighlight = (date: Date, range?: DateRange, hovered?: Date) => {
	const [start, end] = range ?? [undefined, undefined];

	if (!start) return !!hovered && isSameDay(date, hovered);
	if (isSameDay(date, start)) return true;
	if (!end) return !!hovered && start && (isSameDay(date, hovered) || isWithinInterval(date, { start, end: hovered }));
	return (hovered && isSameDay(date, hovered)) || isWithinInterval(date, { start, end });
};

export function CalendarMonth({
	dateString,
	by,
	occupancies,
	disableDate,
	onDateClick,
	getDateHref,
	onOccupancyClick,
	renderOccupancyPopover,
}: CalendarMonthProps) {
	const monthStart = startOfMonth(parseISO(dateString));
	const monthStartsAfter = (getDay(monthStart) + 6) % 7;

	const { hoveredDate, selectedRange } = use(CalendarStateContext);

	const getCommonCalendarDateProps = (date: Date): CalendarDateProps => {
		const dateString = formatISO(date, { representation: "date" });

		return {
			dateString: dateString,
			onClick: onDateClick,
			href: getDateHref?.(date),
			disabled: disableDate?.(date),
			highlighted: shouldHighlight(date, selectedRange, hoveredDate),
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
							{formattedWeekdays.map((day, index) => (
								<div key={`weekday-${index + 1}`}>{day}</div>
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
