import { getDate, isSameDay, parseISO } from "date-fns";
import type { Occupancy, OccupancySlot } from "../model/occupancy";
import type { ReactNode } from "react";
import { OccupancySlot as OccupancySlotComponent } from "./OccupancySlot";

type CalendarDateProps = {
	dateString: string;
	onClick?: (date: Date) => void;
	href?: string;
	onClickOccupancy?: (occupancy: Occupancy) => void;
	occupancySlot?: OccupancySlot;
	renderOccupancyPopover?: (occupancy: Occupancy) => ReactNode;
};

export function CalendarDate(props: CalendarDateProps) {
	const { dateString, occupancySlot, href, onClick, onClickOccupancy, renderOccupancyPopover } = props;

	const date = parseISO(dateString);

	const isToday = isSameDay(date, new Date());
	const isInteractive = !!onClick;
	const hasOccupancies = !!props.occupancySlot;

	return (
		<div
			className={[
				"date",
				...(isInteractive ? ["interactive"] : []),
				...(isToday ? ["today"] : []),
				...(hasOccupancies ? ["has-occupancies"] : []),
			].join(" ")}
		>
			<a href={href} onClick={() => onClick?.(date)}>
				<time dateTime={dateString}>{getDate(date)}</time>
			</a>
			{occupancySlot && (
				<OccupancySlotComponent
					occupancySlot={occupancySlot}
					onClick={onClickOccupancy}
					renderPopover={renderOccupancyPopover}
				/>
			)}
		</div>
	);
}
