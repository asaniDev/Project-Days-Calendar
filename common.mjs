export function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay();
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getNumberOfWeeks(firstDay, daysInMonth) {
  return Math.ceil((firstDay + daysInMonth) / 7);
}
