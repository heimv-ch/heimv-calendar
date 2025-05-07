import { getDate, isSameDay, parseISO } from "date-fns";
import type { Occupancy, OccupancySlot } from "../model/occupancy";
import { memo, type ReactNode } from "react";
import { OccupancySlot as OccupancySlotComponent } from "./OccupancySlot";
import { resolveClassNames } from "../helper/className";

export type CalendarDateProps<O> = {
	dateString: string;
	renderLabel?: (date: Date) => string;
	disabled?: boolean;
	isInHoveredRange?: boolean;
	isInSelectedRange?: boolean;
	onHoverChange?: (date?: Date) => void;
	onClick?: (date: Date) => void;
	href?: string;
	onClickOccupancy?: (occupancy: Occupancy<O>) => void;
	occupancySlot?: OccupancySlot<O>;
	renderOccupancyPopover?: (occupancy: Occupancy<O>) => ReactNode;
};

function _CalendarDate<O>({
	dateString,
	renderLabel,
	occupancySlot,
	disabled,
	isInHoveredRange,
	isInSelectedRange,
	href,
	onHoverChange,
	onClick,
	onClickOccupancy,
	renderOccupancyPopover,
}: CalendarDateProps<O>) {
	const date = parseISO(dateString);

	const isToday = isSameDay(date, new Date());
	const isInteractive = (!!onClick || !!href || !!onClickOccupancy) && !isInSelectedRange;
	const hasOccupancies = !!occupancySlot;

	const className = resolveClassNames({
		date: true,
		today: isToday,
		"has-occupancies": hasOccupancies,
		interactive: isInteractive,
		selected: !!isInSelectedRange,
		hovered: !!isInHoveredRange,
	});

	const buttonProps = {
		onMouseEnter: () => onHoverChange?.(date),
		onMouseLeave: () => onHoverChange?.(undefined),
		className,
	};

	const content = (
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
			{content}
		</a>
	) : (
		<button {...buttonProps} disabled={disabled} onClick={() => onClick?.(date)}>
			{content}
		</button>
	);
}

const typedMemo: <T>(c: T) => T = memo;

export const CalendarDate = typedMemo(_CalendarDate);
