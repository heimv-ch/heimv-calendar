import type { PropsWithChildren } from "react";
import { isSameDay, parseISO } from "date-fns";

type CalendarDateProps = {
	dateString: string;
};

export function CalendarDate({ dateString, children }: PropsWithChildren<CalendarDateProps>) {
	const isToday = isSameDay(parseISO(dateString), new Date());
	return (
		<time className={`date${isToday ? " today" : ""}`} dateTime={dateString}>
			{children}
		</time>
	);
}
