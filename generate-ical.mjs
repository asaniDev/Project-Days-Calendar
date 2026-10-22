
import fs from "node:fs";

import daysData from "./days.json" with { type: "json" };

import { months,getWeekdays } from "./common.mjs";


// Format a date as YYYYMMDD for iCalendar
function formatIcsDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

// Calculate the date using the shared function in common.mjs
function getDate(year, month, dayName, occurrence) {
  const weekdayArray = getWeekdays(
    dayName,
    year,
    month,
  ).noOfWeekdays;

  const occurrenceIndexes = {
    first: 0,
    second: 1,
    third: 2,
    fourth: 3,
    last: -1,
  };

  const index = occurrenceIndexes[occurrence];

  if (index === undefined) {
    throw new Error(`Unknown occurrence: ${occurrence}`);
  }

  const occurrenceDate =
    index === -1
      ? weekdayArray.at(-1)
      : weekdayArray[index];

  if (!occurrenceDate) {
    throw new Error(
      `Could not find ${occurrence} ${dayName} in ${months[month]} ${year}`,
    );
  }

  return formatIcsDate(occurrenceDate);
}

const icsContent = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Days Calendar//EN",
  "",
];

for (let year = 2020; year <= 2030; year++) {
  for (const event of daysData) {
    const month = months.indexOf(event.monthName);

    if (month === -1) {
      throw new Error(`Unknown month: ${event.monthName}`);
    }

    const date = getDate(
      year,
      month,
      event.dayName,
      event.occurrence,
    );

    icsContent.push(
      "BEGIN:VEVENT",
      `UID:${event.name.toLowerCase().replaceAll(" ", "-")}-${year}`,
      `DTSTART;VALUE=DATE:${date}`,
      `SUMMARY:${event.name}`,
      `DESCRIPTION:${event.descriptionURL}`,
      "END:VEVENT",
      "",
    );
  }
}

icsContent.push("END:VCALENDAR");

fs.writeFileSync(
  "days.ics",
  icsContent.join("\r\n") + "\r\n",
);

console.log("days.ics created");
