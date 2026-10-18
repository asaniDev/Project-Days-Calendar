
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  getFirstDay,
  getDaysInMonth,
  getNumberOfWeeks,
} from "./common.mjs";

test("getFirstDay returns the correct weekday", () => {
  assert.equal(getFirstDay(2024, 8), 0);
});

test("getDaysInMonth returns the correct number of days", () => {
  assert.equal(getDaysInMonth(2024, 1), 29);
  assert.equal(getDaysInMonth(2025, 1), 28);
});

test("getNumberOfWeeks returns the correct number of weeks", () => {
  assert.equal(getNumberOfWeeks(0, 30), 5);
});

test("getFirstDay returns the correct weekday for January 2025", () => {
  assert.equal(getFirstDay(2025, 0), 3);
});

test("getDaysInMonth returns 31 for January", () => {
  assert.equal(getDaysInMonth(2025, 0), 31);
});

test("getNumberOfWeeks returns 6 for a month starting on Saturday", () => {
  assert.equal(getNumberOfWeeks(6, 31), 6);
});
