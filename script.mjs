// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

/*import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

window.onload = function () {
  document.querySelector("body").innerText =
    `${getGreeting()} - there are ${daysData.length} known days`;
};*/

const state = {
  selectedMonth: new Date().getMonth(), //get the current month
  selectedYear: new Date().getFullYear(), //get the current year
};

const elements = {};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

window.onload = function () {
  elements.monthSelect = document.getElementById("month-select");
  elements.yearSelect = document.getElementById("year-select");
  elements.calendarBody = document.getElementById("calendar-body");
  elements.currentMonthYear = document.getElementById("current-month-year");

  populateMonthOptions();
  populateYearOptions();

  elements.monthSelect.addEventListener("change", handleMonthChange);
  elements.yearSelect.addEventListener("change", handleYearChange);

  renderCalendar();
};

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

function renderCalendar() {
  elements.monthSelect.value = state.selectedMonth;
  elements.yearSelect.value = state.selectedYear;

  elements.currentMonthYear.textContent = `${months[state.selectedMonth]} ${state.selectedYear}`;

  // Get the weekday of the first day of the selected month
  const firstDay = new Date(
    state.selectedYear,
    state.selectedMonth,
    1,
  ).getDay();

  // Get the total number of days in the selected month
  const daysInMonth = new Date(
    state.selectedYear,
    state.selectedMonth + 1,
    0,
  ).getDate();

  elements.calendarBody.replaceChildren();

  const numberOfWeeks = Math.ceil((firstDay + daysInMonth) / 7);

  for (let week = 0; week < numberOfWeeks; week++) {
    const row = document.createElement("tr");

    for (let day = 0; day < 7; day++) {
      const cell = document.createElement("td");
      const date = week * 7 + day - firstDay + 1;

      if (date > 0 && date <= daysInMonth) {
        cell.textContent = date;
      }

      row.appendChild(cell);
    }

    elements.calendarBody.appendChild(row);
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
