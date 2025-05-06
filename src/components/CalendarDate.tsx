import { getDate, isSameDay, isWithinInterval, parseISO } from "date-fns";
import type { Occupancy, OccupancySlot } from "../model/occupancy";
import { use, type ReactNode } from "react";
import { OccupancySlot as OccupancySlotComponent } from "./OccupancySlot";
import { CalendarStateContext, type DateRange } from "./CalendarStateContext";
import { resolveClassNames } from "../helper/className";

const isSelected = (date: Date, [start, end]: DateRange = [undefined, undefined]) => {
	return !!start && (isSameDay(date, start) || (!!end && isWithinInterval(date, { start, end })));
};

const isHovered = (date: Date, [start, end]: DateRange = [undefined, undefined], hovered?: Date) => {
	if (!hovered) return false;

	if (start && !end) return isWithinInterval(date, { start, end: hovered });

	return isSameDay(date, hovered);
};

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

	const { handleSetHoveredDate, toggleSelectionRange, hoveredDate, selectedRange } = use(CalendarStateContext);

	const isToday = isSameDay(date, new Date());
	const isInteractive = !!onClick || !!href || !!onClickOccupancy;
	const hasOccupancies = !!occupancySlot;
	const selected = isSelected(date, selectedRange);
	const hovered = isHovered(date, selectedRange, hoveredDate);

	const className = resolveClassNames({
		date: true,
		today: isToday,
		"has-occupancies": hasOccupancies,
		interactive: isInteractive,
		selected: selected,
		hovered: hovered,
	});

	const buttonProps = {
		onMouseEnter: () => handleSetHoveredDate(date),
		onMouseLeave: () => handleSetHoveredDate(undefined),
		className,
	};

	const renderContent = () => (
		<>
			<time dateTime={dateString}>{renderLabel?.(date) ?? getDate(date)}</time>
			{occupancySlot && (
				<OccupancySlotComponent
					occupancySlot={occupancySlot}
					onClick={onClickOccupancy}
					renderPopover={renderOccupancyPopover}
				/>
			)}
		</>
	);

	return href ? (
		<a {...buttonProps} aria-disabled={disabled} href={disabled ? undefined : href}>
			{renderContent()}
		</a>
	) : (
		<button
			{...buttonProps}
			disabled={disabled}
			onClick={() => {
				toggleSelectionRange(date);
				onClick?.(date);
			}}
		>
			{renderContent()}
		</button>
	);
}
