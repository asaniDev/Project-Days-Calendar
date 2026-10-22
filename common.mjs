import daysData from "./days.json" with { type: "json" };

export function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay();
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getNumberOfWeeks(firstDay, daysInMonth) {
  return Math.ceil((firstDay + daysInMonth) / 7);
}

//getting events that match the current month
export function getEvent(months, selectedMonth, selectedYear, tableElements) {
  const currentMonth = months[selectedMonth];

  //get any events that happen in the current month
  const matchingEvents = daysData.filter(
    (event) => event.monthName === currentMonth,
  );

  //get the instances of weekdays for found event/s
  if (matchingEvents.length !== 0) {
    matchingEvents.forEach((event) => {

      const occurrenceIndexes = {
        first: 0,
        second: 1,
        third: 2,
        fourth: 3,
        last: -1,
      };

      const weekdayArray = getWeekdays(
        event.dayName,
        selectedYear,
        selectedMonth,
      ).noOfWeekdays;
      const index = occurrenceIndexes[event.occurrence];

      const occurrence =
        index === -1 ? weekdayArray.at(-1) : weekdayArray[index];

      if (!occurrence) {
        return;
      }

      console.log(
        "the format of the date returned from weekday calculator: ",
        occurrence,
      );

      const targetDate = formatDate(occurrence);

      const cell = tableElements.calendarBody.querySelector(
        `td[data-date="${targetDate}"]`,
      );

      if (cell) {
        const currentEvent = document.createElement("p");
        currentEvent.textContent = event.name;
        currentEvent.classList.add("calendar-event");
        cell.appendChild(currentEvent);
      }
    });
  }
}

//calculating the number of times a weekday happens in a given month
export function getWeekdays(dayName, currentYear, currentMonth) {
  let currentDate = new Date(currentYear, currentMonth),
    month = currentMonth,
    weekday = 0,
    weekdays = [];

  //we convert the dayName to numerical value
  const daysOfWeek = new Map([
    ["Sunday", 0],
    ["Monday", 1],
    ["Tuesday", 2],
    ["Wednesday", 3],
    ["Thursday", 4],
    ["Friday", 5],
    ["Saturday", 6],
  ]);

  for (let day of daysOfWeek.keys()) {
    if (day === dayName) {
      weekday = daysOfWeek.get(day);
    }
  }

  // Get the first dayName instance in the month
  while (currentDate.getDay() !== weekday) {
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Get all the other instances of the day in the month
  while (currentDate.getMonth() === month) {
    weekdays.push(new Date(currentDate.getTime()));
    currentDate.setDate(currentDate.getDate() + 7);
  }
  return { noOfWeekdays: weekdays, valueOfDayName: weekday };
}

// Format a date as YYYY-MM-DD
export function formatDate(date) {
  const currentDate = date instanceof Date ? date : new Date(date);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
