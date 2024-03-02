import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"

import { createJstDayjs } from "./date"
import { createDateHash, verificationHash } from "./hash"

describe("verificationHash", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test("タイムスタンプが過去の場合", () => {
    const date = createJstDayjs("2024/05/01")
    const secret = "test"
    const hash = createDateHash(date, secret)

    vi.setSystemTime(new Date(2024, 4, 1))

    const ok = verificationHash({
      hash,
      timestamp: date.valueOf(),
      secret
    })

    expect(ok).toBeTruthy()
  })

  test("タイムスタンプの日付が一致する場合", () => {
    const date = createJstDayjs("2024/04/19")
    const secret = "test"
    const hash = createDateHash(date, secret)

    vi.setSystemTime(new Date(2024, 3, 19))

    const ok = verificationHash({
      hash,
      timestamp: date.valueOf(),
      secret
    })

    expect(ok).toBeTruthy()
  })

  test("タイムスタンプが未来の場合", () => {
    const date = createJstDayjs("2024/05/01")
    const secret = "test"
    const hash = createDateHash(date, secret)

    vi.setSystemTime(new Date(2024, 3, 19))

    const ok = verificationHash({
      hash,
      timestamp: date.valueOf(),
      secret
    })

    expect(ok).toBeFalsy()
  })
})
