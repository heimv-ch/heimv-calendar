import type { ReactNode } from "react";
import type { Occupancy, OccupancySlot } from "../model/occupancy";
import type { CalendarDateProps } from "./CalendarDate";
import { CalendarStateProvider, type DateRange } from "./CalendarStateContext";
import { MonthsCalendar } from "./MonthsCalendar";
import { YearCalendar } from "./YearCalendar";

export enum CalendarViewMode {
  months = "months",
  year = "year",
}

export type CalendarMode = "view" | "interactive" | "range";

type CalendarClickableProps<O> = {
  mode: "interactive";
  getDateHref?: (date: Date) => string;
  onDateClick?: CalendarDateProps<O>["onClick"];
} & Pick<CalendarDateProps<O>, "hrefTarget" | "onOccupancyClick">;

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

export function Calendar<O, M extends CalendarMode = "view">({
    viewMode = CalendarViewMode.months,
    visibleMonth,
    firstDate = new Date(),
    highlightWeekends = true,
    defaultColor,
    mode = "view" as M,
    ...rest
  }: CalendarProps<M, O>) {
  const selectedRange = (mode === "range" && "selectedRange" in rest) ? rest.selectedRange : undefined;
  const onSelectRange = (mode === "range" && "onSelectRange" in rest) ? rest.onSelectRange : undefined;
  
  return (
    <CalendarStateProvider
      selectedRange={mode === "range" ? selectedRange : undefined}
      setSelectedRange={mode === "range" ? onSelectRange : undefined}
      defaultColor={defaultColor}
    >
      <div className="heimv-calendar">
        {viewMode === CalendarViewMode.months ? (
          <MonthsCalendar {...{ firstDate, highlightWeekends, mode, ...rest}} visibleMonths={visibleMonth} />
        ) : (
          <YearCalendar {...{ firstDate, highlightWeekends, mode, ...rest}} />
        )}
      </div>
    </CalendarStateProvider>
  );
}
