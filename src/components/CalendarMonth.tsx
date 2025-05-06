import { eachDayOfInterval, endOfMonth, formatISO, getDay, parseISO, startOfMonth } from "date-fns";
import { CalendarDate, type CalendarDateProps } from "./CalendarDate";
import { formatMonth, formattedWeekdays } from "../helper/format";
import type { CalendarBaseProps } from "./Calendar";

type CalendarMonthProps<O> = CalendarBaseProps<O> & {
	dateString: string;
	by: "week" | "day";
};

export function CalendarMonth<O>(props: CalendarMonthProps<O>) {
	const { mode, dateString, by, occupancies, disableDate, renderOccupancyPopover } = props;

	const monthStart = startOfMonth(parseISO(dateString));
	const monthStartsAfter = (getDay(monthStart) + 6) % 7;

	const getCommonCalendarDateProps = (date: Date): CalendarDateProps<O> => {
		const dateString = formatISO(date, { representation: "date" });

		return {
			dateString: dateString,
			disabled: disableDate?.(date),
			occupancySlot: occupancies?.get(dateString),
			renderOccupancyPopover: renderOccupancyPopover,
			...(mode === "interactive"
				? { onClick: props.onDateClick, href: props.getDateHref?.(date), onClickOccupancy: props.onOccupancyClick }
				: {}),
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
