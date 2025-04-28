import { addMonths, eachMonthOfInterval, formatISO } from "date-fns";
import type { Occupancy } from "../model/occupancy";
import { CalendarMonth } from "./CalendarMonth";
import { defaults } from "../config";

export type CalendarProps = {
	currentDate?: Date;
	occupancies?: Occupancy[];
	visibleMonth?: number;
};

export function Calendar({ currentDate = new Date(), visibleMonth }: CalendarProps) {
	return (
		<div className="calendar">
			<div className="months-calendar">
				<div className="months">
					{eachMonthOfInterval({
						start: currentDate,
						end: addMonths(currentDate, (visibleMonth ?? defaults.visibleMonths) - 1),
					}).map((date) => {
						const dateString = formatISO(date, { representation: "date" });
						return <CalendarMonth dateString={dateString} key={dateString} />;
					})}
				</div>
			</div>
		</div>
	);
}
