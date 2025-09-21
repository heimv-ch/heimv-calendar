import { getDate, isSameDay, parseISO } from "date-fns";
import { memo, type ReactNode } from "react";
import { resolveClassNames } from "../helper/className";
import type { Occupancy, OccupancySlot } from "../model/occupancy";
import { OccupancySlot as OccupancySlotComponent } from "./OccupancySlot";

export type CalendarDateProps<O> = {
  isoDate: string;
  renderLabel?: (date: Date) => string;
  disabled?: boolean;
  isWeekend?: boolean;
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
  isoDate,
  renderLabel,
  occupancySlot,
  disabled,
  isWeekend,
  isInHoveredRange,
  isInSelectedRange,
  href,
  onHoverChange,
  onClick,
  onClickOccupancy,
  renderOccupancyPopover,
}: CalendarDateProps<O>) {
  const date = parseISO(isoDate);

  const isToday = isSameDay(date, new Date());
  const isInteractive = (!!onClick || !!href || !!onClickOccupancy) && !isInSelectedRange && !disabled;
  const hasOccupancies = !!occupancySlot;

  const containerClassName = resolveClassNames({
    date: true,
    today: isToday,
    "has-occupancies": hasOccupancies,
    selected: !!isInSelectedRange,
    hovered: !!isInHoveredRange,
    weekend: !!isWeekend,
    disabled: !!disabled,
  });
  const contentClassName = resolveClassNames({
    interactive: isInteractive,
  });

  const buttonProps = {
    onMouseEnter: () => onHoverChange?.(date),
    onMouseLeave: () => onHoverChange?.(undefined),
  };

  const label = renderLabel?.(date) ?? <span className="date-label">{getDate(date)}</span>;
  const content = href ? (
    <a aria-disabled={disabled} className={contentClassName} href={disabled ? undefined : href}>
      {label}
    </a>
  ) : (
    <button {...buttonProps} className={contentClassName} type="button" disabled={true} onClick={() => onClick?.(date)}>
      {label}
    </button>
  );
  return (
    <time className={containerClassName} dateTime={isoDate}>
      {content}
      {occupancySlot && (
        <OccupancySlotComponent
          occupancySlot={occupancySlot}
          onClick={onClickOccupancy}
          renderPopover={renderOccupancyPopover}
        />
      )}
    </time>
  );
}

const typedMemo: <T>(c: T) => T = memo;

export const CalendarDate = typedMemo(_CalendarDate);
