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
import { formatMonth, formattedWeekdays, narrowFormattedWeekdays } from "../helper/format";
import type { CalendarBaseProps } from "./Calendar";
import { CalendarStateContext, type DateRange } from "./CalendarStateContext";
import { use, useMemo } from "react";

const isSelected = (date: Date, [start, end]: DateRange = [undefined, undefined]) => {
	return !!start && (isSameDay(date, start) || (!!end && isWithinInterval(date, { start, end })));
};

const isHovered = (date: Date, [start, end]: DateRange = [undefined, undefined], hovered?: Date) => {
	if (!hovered) return false;

	if (start && !end) return isWithinInterval(date, { start, end: hovered });

	return isSameDay(date, hovered);
};

type CalendarMonthProps<O> = CalendarBaseProps<O> & {
	dateString: string;
	by: "week" | "day";
};

export function CalendarMonth<O>(props: CalendarMonthProps<O>) {
	const { mode, dateString, by, occupancies, disableDate, highlightWeekends, renderOccupancyPopover } = props;

	const { hoveredDate, selectedRange, handleSetHoveredDate, toggleSelectionRange } = use(CalendarStateContext);

	const monthStart = startOfMonth(parseISO(dateString));
	const monthStartsAfter = (getDay(monthStart) + 6) % 7;

	const daysInMonth = useMemo(
		() => eachDayOfInterval({ start: monthStart, end: endOfMonth(monthStart) }),
		[monthStart],
	);

	const getCommonCalendarDateProps = (date: Date): CalendarDateProps<O> => {
		const dateString = formatISO(date, { representation: "date" });

		return {
			dateString,
			disabled: disableDate?.(date),
			isWeekend: highlightWeekends && !(date.getDay() % 6),
			occupancySlot: occupancies?.get(dateString),
			renderOccupancyPopover: renderOccupancyPopover,
			...(mode === "interactive"
				? { onClick: props.onDateClick, href: props.getDateHref?.(date), onClickOccupancy: props.onOccupancyClick }
				: {}),
			...(mode === "range"
				? {
						isInHoveredRange: isHovered(date, selectedRange, hoveredDate),
						isInSelectedRange: isSelected(date, selectedRange),
						onClick: () => toggleSelectionRange(date),
						onHoverChange: handleSetHoveredDate,
					}
				: {}),
		};
	};

	return (
		<div className="month">
			{by === "week" ? (
				<>
					<header>
						<h3>
							{formatMonth(monthStart)} {monthStart.getFullYear()}
						</h3>
						<div className="weekdays">
							{formattedWeekdays.map((day, index) => (
								<div key={`weekday-${index + 1}`}>{day}</div>
							))}
						</div>
					</header>
					<div className="dates">
						{!!monthStartsAfter && <div style={{ gridColumn: `span ${monthStartsAfter}` }} />}

						{daysInMonth.map((date) => (
							<CalendarDate<O> key={date.toISOString()} {...getCommonCalendarDateProps(date)} />
						))}
					</div>
				</>
			) : (
				<>
					<div className="month-label">{formatMonth(monthStart)}</div>

					{daysInMonth.map((date) => (
						<CalendarDate
							key={date.toISOString()}
							renderLabel={() => narrowFormattedWeekdays[(getDay(date) + 6) % 7]}
							{...getCommonCalendarDateProps(date)}
						/>
					))}
				</>
			)}
		</div>
	);
}
