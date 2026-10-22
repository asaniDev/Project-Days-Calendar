import daysData from "./days.json" with { type: "json" };

import {
  months,
  getFirstDay,
  getDaysInMonth,
  getNumberOfWeeks,
  getWeekdays,
  formatDate,
} from "./common.mjs";

const state = {
  selectedMonth: new Date().getMonth(), //get the current month
  selectedYear: new Date().getFullYear(), //get the current year
};

const elements = {};


if (typeof window !== "undefined") {
  window.onload = function () {
    elements.monthSelect = document.getElementById("month-select");
    elements.yearSelect = document.getElementById("year-select");
    elements.calendarBody = document.getElementById("calendar-body");
    elements.currentMonthYear = document.getElementById("current-month-year");
    elements.previousMonthBtn = document.getElementById("previous-month");
    elements.nextMonthBtn = document.getElementById("next-month");

    populateMonthOptions();
    populateYearOptions();

    elements.monthSelect.addEventListener("change", handleMonthChange);
    elements.yearSelect.addEventListener("change", handleYearChange);
    elements.previousMonthBtn.addEventListener("click", handleDecrementMonth);
    elements.nextMonthBtn.addEventListener("click", handleIncrementMonth);

    renderCalendar();
  };
}

// Add month options to the Month dropdown
function populateMonthOptions() {
  months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    elements.monthSelect.appendChild(option);
  });
}

// Add year options to the Year dropdown
function populateYearOptions() {
  const currentYear = new Date().getFullYear();

  // Generate years from 126 years ago to 100 years ahead
  for (let year = currentYear - 126; year <= currentYear + 100; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    elements.yearSelect.appendChild(option);
  }
}

// Add the year to the dropdown if it does not already exist.
function addYearOptionIfMissing(year) {
  const exists = Array.from(elements.yearSelect.options).some(
    (option) => Number(option.value) === year,
  );

  if (!exists) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    elements.yearSelect.appendChild(option);
  }
}

function renderCalendar() {
  addYearOptionIfMissing(state.selectedYear);

  elements.monthSelect.value = state.selectedMonth;
  elements.yearSelect.value = state.selectedYear;

  elements.currentMonthYear.textContent = `${months[state.selectedMonth]} ${state.selectedYear}`;

  // Get the weekday of the first day of the selected month
  const firstDay = getFirstDay(state.selectedYear, state.selectedMonth);

  // Get the total number of days in the selected month
  const daysInMonth = getDaysInMonth(state.selectedYear, state.selectedMonth);

  elements.calendarBody.replaceChildren();

  const numberOfWeeks = getNumberOfWeeks(firstDay, daysInMonth);

  for (let week = 0; week < numberOfWeeks; week++) {
    const row = document.createElement("tr");

    for (let day = 0; day < 7; day++) {
      const cell = document.createElement("td");
      const date = week * 7 + day - firstDay + 1;

      if (date > 0 && date <= daysInMonth) {
        cell.textContent = date;
        //adding data date attribute to help select a specific cell
        cell.dataset.date = formatDate(
          new Date(state.selectedYear, state.selectedMonth, date),
        );
      }

      row.appendChild(cell);
    }

    elements.calendarBody.appendChild(row);
  }

  getEvent(state.selectedMonth, state.selectedYear);
}


//getting events that match the current month
function getEvent(selectedMonth, selectedYear) {
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

      const targetDate = formatDate(occurrence);

        const cell = elements.calendarBody.querySelector(
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

// Update the selected month and redraw the calendar
function handleMonthChange() {
  state.selectedMonth = Number(elements.monthSelect.value);
  renderCalendar();
}

// Update the selected year and redraw the calendar
function handleYearChange() {
  state.selectedYear = Number(elements.yearSelect.value);
  renderCalendar();
}

//Decreasing the month when previous button clicked
function handleDecrementMonth() {
  if (state.selectedMonth > 0) {
    state.selectedMonth -= 1;
    renderCalendar();
  } else {
    state.selectedMonth = 11;
    state.selectedYear -= 1;
    renderCalendar();
  }
}

// Increment the month when the Next button is clicked.
function handleIncrementMonth() {
  if (state.selectedMonth < 11) {
    state.selectedMonth += 1;
    renderCalendar();
  } else {
    state.selectedMonth = 0;
    state.selectedYear += 1;
    renderCalendar();
  }
}
