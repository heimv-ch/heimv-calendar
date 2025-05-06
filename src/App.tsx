import { addDays, addMonths, formatISO, subMonths } from "date-fns";
import { Calendar, CalendarViewMode } from "./components/Calendar";
import { useState } from "react";
// import type { DateRange } from "./components/CalendarStateContext";

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

	// const [selectedRange, setSelectedRange] = useState<DateRange>([addDays(new Date(), 5), undefined]);

	const [firstDate, setFirstDate] = useState(new Date());

	return (
		<>
			<h1>Calendar Playground</h1>

			<button onClick={() => setFirstDate(addMonths(firstDate, 1))}>&lt;</button>
			<button onClick={() => setFirstDate(subMonths(firstDate, 1))}>&gt;</button>

			<Calendar
				mode="interactive"
				viewMode={CalendarViewMode.months}
				firstDate={firstDate}
				occupancies={
					new Map([
						[today, { allDay: { key: "alkdfjllasdjfdlkasjadslfjasdlkjasdlkjkf", amount: 5, data: { test: true } } }],
						[
							plus2,
							{
								forenoon: { key: "sakjfklösfjsal", color: "lightblue", amount: 5, data: { test: false } },
								afternoon: { key: "asldkjfdflk", color: "#e8bc56", amount: 3 },
							},
						],
						[plus3, { allDay: { key: "alkdfjlkf", amount: 2 } }],
						[plus4, { forenoon: { key: "alkdfjlkf" } }],
						[plus8, { allDay: { key: "alkdfjlkf", amount: 7 } }],
					])
				}
				disableDate={(date) => date < new Date()}
				// type="interactive"
				onDateClick={console.log}
				// getDateHref={(date) => `https://google.ch/${date}`}
				onOccupancyClick={console.log}
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
