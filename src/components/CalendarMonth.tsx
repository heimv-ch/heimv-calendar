import { eachDayOfInterval, endOfMonth, formatISO, getDay, parseISO, startOfMonth } from "date-fns";
import { CalendarDate, type CalendarDateProps } from "./CalendarDate";
import { formatMonth, formattedWeekdays } from "../helper/format";
import type { CalendarBaseProps } from "./Calendar";

type CalendarMonthProps = CalendarBaseProps & {
	dateString: string;
	by: "week" | "day";
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

	const getCommonCalendarDateProps = (date: Date): CalendarDateProps => {
		const dateString = formatISO(date, { representation: "date" });

		return {
			dateString: dateString,
			onClick: onDateClick,
			href: getDateHref?.(date),
			disabled: disableDate?.(date),
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
