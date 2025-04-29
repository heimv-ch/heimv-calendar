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

	return (
		<div
			className={["date", ...(isToday ? ["today"] : []), ...(props.occupancySlot ? ["has-occupancies"] : [])].join(" ")}
		>
			<a href={href} onClick={() => onClick?.(date)}>
				<time dateTime={dateString}>{getDate(date)}</time>
			</a>
			{props.occupancySlot && (
				<svg viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet">
					<title>Occupancy</title>
					{allDay ? (
						// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
						<rect
							onClick={(e) => {
								e.stopPropagation();
								onClickOccupancy?.(allDay);
							}}
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
								// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
								<polygon
									onClick={(e) => {
										e.stopPropagation();
										onClickOccupancy?.(forenoon);
									}}
									className="occupancy-slot"
									points="0,0 0,46 46,0"
									fill={forenoon.color ?? defaults.color}
								/>
							)}
							{afternoon && (
								// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
								<polygon
									onClick={(e) => {
										e.stopPropagation();
										onClickOccupancy?.(afternoon);
									}}
									className="occupancy-slot"
									points="48,0 48,48 0,48"
									fill={afternoon.color ?? defaults.color}
								/>
							)}
						</>
					)}
				</svg>
			)}
		</div>
	);
}
