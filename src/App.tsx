import { addDays, formatISO } from "date-fns";
import { Calendar, CalendarMode } from "./components/Calendar";

function App() {
	const today = formatISO(new Date(), { representation: "date" });
	const plus1 = formatISO(addDays(new Date(), 1), { representation: "date" });
	const plus2 = formatISO(addDays(new Date(), 2), { representation: "date" });
	const plus3 = formatISO(addDays(new Date(), 3), { representation: "date" });
	const plus4 = formatISO(addDays(new Date(), 4), { representation: "date" });
	const plus5 = formatISO(addDays(new Date(), 5), { representation: "date" });
	const plus6 = formatISO(addDays(new Date(), 6), { representation: "date" });
	const plus7 = formatISO(addDays(new Date(), 7), { representation: "date" });
	const plus8 = formatISO(addDays(new Date(), 8), { representation: "date" });

	return (
		<>
			<h1>Calendar Playground</h1>
			<Calendar
				mode={CalendarMode.year}
				occupancies={
					new Map([
						[today, { allDay: { key: "alkdfjllasdjfdlkasjadslfjasdlkjasdlkjkf" } }],
						[
							plus2,
							{
								forenoon: { key: "sakjfklösfjsal", color: "lightblue" },
								afternoon: { key: "asldkjfdflk", color: "#e8bc56" },
							},
						],
						[plus3, { allDay: { key: "alkdfjlkf" } }],
						[plus4, { forenoon: { key: "alkdfjlkf" } }],
					])
				}
				onOccupancyClick={console.log}
				onDateClick={console.log}
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
