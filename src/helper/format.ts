export const formatMonth = (date: Date) =>
  new Intl.DateTimeFormat(document.documentElement.lang, {
    month: "long",
  }).format(date);

export const formatWeekDay = (date: Date, format: Intl.DateTimeFormatOptions["weekday"] = "short") =>
  new Intl.DateTimeFormat(document.documentElement.lang, {
    weekday: format,
  }).format(date);

export const formattedWeekdays = [...Array(7).keys()].map(
  (day) => formatWeekDay(new Date(Date.UTC(2021, 2, day + 1))) /* February 1–7, 2021 is Monday - Sunday */,
);

export const narrowFormattedWeekdays = [...Array(7).keys()].map(
  (day) => formatWeekDay(new Date(Date.UTC(2021, 2, day + 1)), "narrow") /* February 1–7, 2021 is Monday - Sunday */,
);
