import { createContext, type PropsWithChildren, useState } from "react";

export type DateRange = [Date | undefined, Date | undefined];

type CalendarState = {
	selectedRange?: DateRange;
	toggleSelectionRange: (date: Date) => void;
	hoveredDate?: Date;
	setHoveredDate: (date?: Date) => void;
};

export const CalendarStateContext = createContext<CalendarState>({
	setHoveredDate: () => {},
	toggleSelectionRange: () => {},
});

type CalendarStateProviderProps = {
	selectedRange?: DateRange;
	setSelectedRange?: (range: DateRange) => void;
};

export function CalendarStateProvider({
	children,
	selectedRange,
	setSelectedRange,
}: PropsWithChildren<CalendarStateProviderProps>) {
	const [hoveredDate, setHoveredDate] = useState<Date>();

	const toggleSelectionRange = (date: Date) => {
		if (selectedRange?.[0] && !selectedRange?.[1]) {
			setSelectedRange?.([selectedRange[0], date]);
		} else {
			setSelectedRange?.([date, undefined]);
		}
	};

	return (
		<CalendarStateContext.Provider value={{ selectedRange, toggleSelectionRange, hoveredDate, setHoveredDate }}>
			{children}
		</CalendarStateContext.Provider>
	);
}
