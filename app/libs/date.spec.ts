import { describe, expect, test } from "vitest"

import { calcSecondsToBirthday, createJstDayjs } from "./date"

describe("calcSecondsToBirthday", () => {
  test("正しい秒数が計算できる", () => {
    const startDate = createJstDayjs("2024/04/01 00:00:00", true)
    const seconds = calcSecondsToBirthday(startDate, {
      month: 4,
      date: 19
    })

    expect(seconds).toBe(1555200)
  })

  test("過ぎている場合来年までの秒数が返る", () => {
    const startDate = createJstDayjs("2024/04/20 00:00:00", true)
    const seconds = calcSecondsToBirthday(startDate, {
      month: 4,
      date: 19
    })

    expect(seconds).toBe(31449600)
  })
})
