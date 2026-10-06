const getCalendarLocale = (fallback = "en-US") => {
  const localeFromDocument = typeof document !== "undefined" ? document.documentElement.lang : "";
  const localeFromNavigator = typeof navigator !== "undefined" ? navigator.language : "";

  return localeFromDocument || localeFromNavigator || fallback;
};

export const formatMonth = (date: Date) =>
  new Intl.DateTimeFormat(getCalendarLocale(), {
    month: "long",
  }).format(date);

export const formatWeekDay = (date: Date, format: Intl.DateTimeFormatOptions["weekday"] = "short") =>
  new Intl.DateTimeFormat(getCalendarLocale(), {
    weekday: format,
  }).format(date);

export const formattedWeekdays = [...Array(7).keys()].map(
  (day) => formatWeekDay(new Date(Date.UTC(2021, 2, day + 1))) /* February 1–7, 2021 is Monday - Sunday */,
);
