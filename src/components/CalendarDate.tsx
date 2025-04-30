import { getDate, isSameDay, parseISO } from "date-fns";
import type { Occupancy, OccupancySlot } from "../model/occupancy";
import type { ReactNode } from "react";
import { OccupancySlot as OccupancySlotComponent } from "./OccupancySlot";

export type CalendarDateProps = {
	dateString: string;
	renderLabel?: (date: Date) => string;
	disabled?: boolean;
	onClick?: (date: Date) => void;
	href?: string;
	onClickOccupancy?: (occupancy: Occupancy) => void;
	occupancySlot?: OccupancySlot;
	renderOccupancyPopover?: (occupancy: Occupancy) => ReactNode;
};

export function CalendarDate({
	dateString,
	renderLabel,
	occupancySlot,
	disabled,
	href,
	onClick,
	onClickOccupancy,
	renderOccupancyPopover,
}: CalendarDateProps) {
	const date = parseISO(dateString);

	const isToday = isSameDay(date, new Date());
	const isInteractive = !!onClick || !!href;
	const hasOccupancies = !!occupancySlot;

	const renderDate = () => <time dateTime={dateString}>{renderLabel?.(date) ?? getDate(date)}</time>;

	return (
		<div
			className={[
				"date",
				...(isInteractive ? ["interactive"] : []),
				...(isToday ? ["today"] : []),
				...(hasOccupancies ? ["has-occupancies"] : []),
			].join(" ")}
		>
			{href ? (
				<a aria-disabled={disabled} href={disabled ? undefined : href}>
					{renderDate()}
				</a>
			) : (
				<button disabled={disabled} onClick={() => onClick?.(date)}>
					{renderDate()}
				</button>
			)}

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
