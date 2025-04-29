import { getDate, isSameDay, parseISO } from "date-fns";
import type { Occupancy, OccupancySlot } from "../model/occupancy";
import { defaults } from "../config";

type CalendarDateProps = {
	dateString: string;
	onClick?: (date: Date) => void;
	href?: string;
	onClickOccupancy?: (occupancy: Occupancy) => void;
	occupancySlot?: OccupancySlot;
};

export function CalendarDate(props: CalendarDateProps) {
	const {
		dateString,
		occupancySlot: { allDay, forenoon, afternoon } = {},
		href,
		onClick,
		onClickOccupancy,
	} = props;

	const date = parseISO(dateString);

	const isToday = isSameDay(date, new Date());

	const classNames = ["occupancy-calendar-date", "has-occupancies"].filter((className) => className).join(" ");

	return (
		<time className={["date", ...(isToday ? ["today"] : [])].join(" ")} dateTime={dateString}>
			<a className="date-action" href={href} onClick={() => onClick?.(date)}>
				{getDate(date)}
			</a>
			<div className={classNames}>
				<svg viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet">
					<title>Occupancy</title>
					{allDay ? (
						<rect
							onKeyUp={() => onClickOccupancy?.(allDay)}
							className="occupancy-slot"
							y="0"
							x="0"
							width="48"
							height="48"
							fill={allDay.color ?? defaults.color}
						/>
					) : (
						<>
							{forenoon && (
								<polygon
									onKeyUp={() => onClickOccupancy?.(forenoon)}
									className="occupancy-slot"
									points="0,0 0,46 46,0"
									fill={forenoon.color ?? defaults.color}
								/>
							)}
							{afternoon && (
								<polygon
									onKeyUp={() => onClickOccupancy?.(afternoon)}
									className="occupancy-slot"
									points="48,0 48,48 0,48"
									fill={afternoon.color ?? defaults.color}
								/>
							)}
						</>
					)}
				</svg>
			</div>
		</time>
	);
}
