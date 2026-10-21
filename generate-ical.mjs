import daysData from "./days.json" with { type: "json" };

import { getWeekdays } from "./script.mjs";
//step 1 read the json file
function getDate(year, month, day, occurrence) {
  const eventDay = getWeekdays(day, year, month);

  const occurrenceIndexes = {
    first: 0,
    second: 1,
    third: 2,
    fourth: 3,
    last: -1,
  };

  const index = occurrenceIndexes[occurrence];

  const occurrenceDate =
    index === -1 ? weekdayArray.at(-1) : weekdayArray[index];

  return formatIcsDate(occurrenceDate);
}

function formatIcsDate(date) {
  const currentDate =
    date instanceof Date
      ? date
      : new Date(state.selectedYear, state.selectedMonth, date);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}
console.log(`{getGreeting()} - there are ${daysData.length} known days`);*/

import fs from "node:fs";
import daysData from "./days.json" with { type: "json" };

let icsContent = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Days Calendar//EN",
    "",
];


for (let year = 2020; year <= 2030; year++) {
  for (const event of daysData) {
    icsContent.push(
      "BEGIN:VEVENT",
      `UID:${event.name.toLowerCase().replaceAll(" ", "-")}-${year}`,
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
