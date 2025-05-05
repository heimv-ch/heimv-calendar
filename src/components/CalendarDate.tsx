import { getDate, isSameDay, parseISO } from "date-fns";
import type { Occupancy, OccupancySlot } from "../model/occupancy";
import { use, type ReactNode } from "react";
import { OccupancySlot as OccupancySlotComponent } from "./OccupancySlot";
import { CalendarStateContext } from "./CalendarStateContext";

export type CalendarDateProps = {
	dateString: string;
	renderLabel?: (date: Date) => string;
	disabled?: boolean;
	highlighted?: boolean;
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
	highlighted,
	href,
	onClick,
	onClickOccupancy,
	renderOccupancyPopover,
}: CalendarDateProps) {
	const date = parseISO(dateString);

	const isToday = isSameDay(date, new Date());
	const isInteractive = !!onClick || !!href;
	const hasOccupancies = !!occupancySlot;

	const { setHoveredDate, toggleSelectionRange } = use(CalendarStateContext);

	const renderDate = () => <time dateTime={dateString}>{renderLabel?.(date) ?? getDate(date)}</time>;

	return (
		<div
			onMouseEnter={() => setHoveredDate(date)}
			onMouseLeave={() => setHoveredDate(undefined)}
			className={[
				"date",
				...(isInteractive ? ["interactive"] : []),
				...(isToday ? ["today"] : []),
				...(hasOccupancies ? ["has-occupancies"] : []),
				...(highlighted ? ["highlighted"] : []),
			].join(" ")}
		>
			{href ? (
				<a aria-disabled={disabled} href={disabled ? undefined : href}>
					{renderDate()}
				</a>
			) : (
				<button
					disabled={disabled}
					onClick={() => {
						toggleSelectionRange(date);
						onClick?.(date);
					}}
				>
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
