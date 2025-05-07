import { addDays, addMonths, formatISO, subDays, subMonths } from "date-fns";
import { Calendar, CalendarViewMode } from "./components/Calendar";
import { useState } from "react";
import type { OccupancySlot } from "./model/occupancy";
import type { DateRange } from "./components/CalendarStateContext";

function App() {
	const today = formatISO(new Date(), { representation: "date" });
	// const plus1 = formatISO(addDays(new Date(), 1), { representation: "date" });
	const plus2 = formatISO(addDays(new Date(), 2), { representation: "date" });
	const plus3 = formatISO(addDays(new Date(), 3), { representation: "date" });
	const plus4 = formatISO(addDays(new Date(), 4), { representation: "date" });
	// const plus5 = formatISO(addDays(new Date(), 5), { representation: "date" });
	// const plus6 = formatISO(addDays(new Date(), 6), { representation: "date" });
	// const plus7 = formatISO(addDays(new Date(), 7), { representation: "date" });
	const plus8 = formatISO(addDays(new Date(), 8), { representation: "date" });

	const [selectedRange, setSelectedRange] = useState<DateRange>([addDays(new Date(), 5), undefined]);

	const [firstDate, setFirstDate] = useState(new Date());

	const occupancies: Map<string, OccupancySlot<{ additionalData: string }>> = new Map([
		["2025-05-08", { allDay: { key: "0196a9b9-0435-712b-b5b2-c1892dcdaabe", color: "#e85f5f" } }],
		[
			"2025-05-09",
			{
				forenoon: { key: "55441c4b-1e68-4f9b-9141-5658f14d411c", color: "#e85f5f" },
				afternoon: { key: "9060b84c-c09a-44de-8ad7-d0d908d1d5ea", color: "#0061ff" },
			},
		],
		[
			"2025-05-18",
			{
				forenoon: {
					key: "55441c4b-1e68-4f9b-9141-5658f14d411c",
					color: "#e8bc56",
					data: { additionalData: "Some data" },
				},
			},
		],
	]);

	return (
		<>
			<h1>Calendar Playground</h1>

			<button onClick={() => setFirstDate(addMonths(firstDate, 1))}>&lt;</button>
			<button onClick={() => setFirstDate(subMonths(firstDate, 1))}>&gt;</button>

			<Calendar
				mode="interactive"
				viewMode={CalendarViewMode.months}
				firstDate={firstDate}
				occupancies={occupancies}
				disableDate={(date) => addDays(date, 1) <= new Date()}
				// type="interactive"
				onDateClick={console.log}
				// getDateHref={(date) => `https://google.ch/${date}`}
				// onOccupancyClick={console.log}
				// selectedRange={selectedRange}
				// onSelectRange={setSelectedRange}
				visibleMonth={8}
				renderOccupancyPopover={({ key }) => (
					<div
						style={{
							boxShadow: "0 0 5px black",
							backgroundColor: "white",
							padding: 20,
						}}
					>
						{key}
					</div>
				)}
			/>
		</>
	);
}

export default App;
