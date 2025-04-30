export const formatMonth = (date: Date) =>
	new Intl.DateTimeFormat(document.documentElement.lang, {
		month: "long",
	}).format(date);

export const formatWeekDay = (date: Date) =>
	new Intl.DateTimeFormat(document.documentElement.lang, {
		weekday: "short",
	}).format(date);

export const formattedWeekdays = Array.from(
	{ length: 7 },
	(_, i) => formatWeekDay(new Date(Date.UTC(2021, 2, i + 1))) /* February 1–7, 2021 is Monday - Sunday*/,
);
