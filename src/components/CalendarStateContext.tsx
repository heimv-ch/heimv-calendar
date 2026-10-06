import { createContext, type PropsWithChildren, useCallback, useRef, useState } from "react";

export type DateRange = [Date | undefined, Date | undefined];

type CalendarState = {
  selectedRange?: DateRange;
  toggleSelectionRange: (date: Date) => void;
  hoveredDate?: Date;
  handleSetHoveredDate: (date?: Date) => void;
  defaultColor?: string;
};

export const CalendarStateContext = createContext<CalendarState>({
  handleSetHoveredDate: () => {},
  toggleSelectionRange: () => {},
});

type CalendarStateProviderProps = {
  selectedRange?: DateRange;
  setSelectedRange?: (range: DateRange) => void;
  defaultColor?: string;
};

export function CalendarStateProvider({
  children,
  selectedRange,
  setSelectedRange,
  defaultColor,
}: PropsWithChildren<CalendarStateProviderProps>) {
  const [hoveredDate, setHoveredDate] = useState<Date>();
  const hoverDebounceRef = useRef<number | undefined>(undefined);

  const toggleSelectionRange = useCallback(
    (date: Date) => {
      const [start, end] = selectedRange || [];

      if (start && !end) {
        const range: DateRange = start <= date ? [start, date] : [date, start];

        setSelectedRange?.(range);
      } else {
        setSelectedRange?.([date, undefined]);
      }
    },
    [selectedRange, setSelectedRange],
  );

  const handleSetHoveredDate = useCallback((date?: Date) => {
    if (hoverDebounceRef.current) {
      clearTimeout(hoverDebounceRef.current);
      hoverDebounceRef.current = undefined;
    }

    if (date) return setHoveredDate(date);

    hoverDebounceRef.current = setTimeout(() => setHoveredDate(undefined), 100);
  }, []);

  // useEffect(
  //   () => () => {
  //     if (hoverDebounceRef.current) {
  //       clearTimeout(hoverDebounceRef.current);
  //    value={{ selectedRange, toggleSelectionRange, hoveredDate, handleSetHoveredDate, defaultColor }}

  return (
    <CalendarStateContext.Provider
      value={{ selectedRange, toggleSelectionRange, hoveredDate, handleSetHoveredDate, defaultColor }}
    >
      {children}
    </CalendarStateContext.Provider>
  );
}
