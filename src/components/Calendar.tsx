import type { Occupancy, OccupancySlot } from "../model/occupancy";
import type { ReactNode } from "react";
import { MonthsCalendar } from "./MonthsCalendar";
import { YearCalendar } from "./YearCalendar";
import { CalendarStateProvider, type DateRange } from "./CalendarStateContext";

export enum CalendarViewMode {
  months = "months",
  year = "year",
}

export type CalendarMode = "view" | "interactive" | "range";

type CalendarClickableProps<O> = {
  mode: "interactive";
  onOccupancyClick?: (occupancy: Occupancy<O>) => void;
  onDateClick?: (date: Date) => void;
  getDateHref?: (date: Date) => string;
};

type CalendarRangeSelectProps = {
  mode: "range";
  onSelectRange?: (range: DateRange) => void;
  selectedRange?: DateRange;
};

type CalendarModeProps<O> = CalendarClickableProps<O> | CalendarRangeSelectProps | { mode: "view" };

export type CalendarBaseProps<O> = {
  firstDate: Date;
  highlightWeekends?: boolean;
  occupancyOfDate?: (date: Date) => OccupancySlot<O> | undefined;
  disableDate?: (date: Date) => boolean;
  renderOccupancyPopover?: (occupancy: Occupancy<O>) => ReactNode;
} & CalendarModeProps<O>;

export type CalendarProps<M extends CalendarMode, O> = CalendarBaseProps<O> & {
  mode?: M;
  viewMode?: CalendarViewMode;
  defaultColor?: string;
  visibleMonth?: number;
} & CalendarModeProps<O>;

export function Calendar<O, M extends CalendarMode = "view">(props: CalendarProps<M, O>) {
  const {
    viewMode = CalendarViewMode.months,
    visibleMonth,
    firstDate = new Date(),
    highlightWeekends = true,
    defaultColor,
    ...calendarBaseProps
  } = props;

  const commonCalendarProps = { firstDate, highlightWeekends, ...calendarBaseProps };

  const renderCalendar = () => {
    switch (viewMode) {
      case CalendarViewMode.months:
        return <MonthsCalendar {...commonCalendarProps} visibleMonths={visibleMonth} />;
      case CalendarViewMode.year:
        return <YearCalendar {...commonCalendarProps} />;
      default:
        break;
    }
  };

  return (
    <CalendarStateProvider
      selectedRange={props.mode === "range" ? (props as CalendarRangeSelectProps).selectedRange : undefined}
      setSelectedRange={props.mode === "range" ? (props as CalendarRangeSelectProps).onSelectRange : undefined}
      defaultColor={defaultColor}
    >
      <div className="calendar">{renderCalendar()}</div>
    </CalendarStateProvider>
  );
}

Calendar.defaultProps = { mode: "view", firstDate: new Date() };
