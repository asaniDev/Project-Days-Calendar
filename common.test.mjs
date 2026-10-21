import { describe, expect, test } from "vitest";

import { formatDate } from "./script.mjs";

import {
  getFirstDay,
  getDaysInMonth,
  getNumberOfWeeks,
  getWeekdays,
} from "./common.mjs";

test("getFirstDay returns the correct weekday", () => {
  expect(getFirstDay(2024, 8)).toBe(0);
});

test("getDaysInMonth returns the correct number of days", () => {
  expect(getDaysInMonth(2024, 1)).toBe(29);
  expect(getDaysInMonth(2025, 1)).toBe(28);
});

test("getNumberOfWeeks returns the correct number of weeks", () => {
  expect(getNumberOfWeeks(0, 30)).toBe(5);
});

test("getFirstDay returns the correct weekday for January 2025", () => {
  expect(getFirstDay(2025, 0)).toBe(3);
});

describe("getWeekdays", () => {
  test("returns every Monday in February 2024", () => {
    const result = getWeekdays("Monday", 2024, 1);

    expect(result.valueOfDayName).toBe(1);
    expect(result.noOfWeekdays.map((date) => date.getDate())).toEqual([
      5, 12, 19, 26,
    ]);
  });

  test("returns the correct weekday dates for a month with five occurrences", () => {
    const result = getWeekdays("Thursday", 2024, 1);

    expect(result.noOfWeekdays.map((date) => date.getDate())).toEqual([
      1, 8, 15, 22, 29,
    ]);
  });

  test("does not include dates from the next month", () => {
    const result = getWeekdays("Saturday", 2025, 1);

    expect(result.noOfWeekdays.map((date) => date.getMonth())).toEqual([
      1, 1, 1, 1,
    ]);
    expect(result.noOfWeekdays.map((date) => date.getDate())).toEqual([
      1, 8, 15, 22,
    ]);
  });
});

describe("formatDate", () => {
  test("formats a Date as YYYY-MM-DD", () => {
    expect(formatDate(new Date(2024, 1, 29))).toBe("2024-02-29");
  });

  test("pads single-digit months and days", () => {
    expect(formatDate(new Date(2025, 0, 5))).toBe("2025-01-05");
  });
});
