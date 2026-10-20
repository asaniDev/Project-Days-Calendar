// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

/*import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

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
