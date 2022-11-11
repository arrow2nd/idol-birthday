import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { createBirthDateRangeRegex } from './date'

describe('createBirthDateRangeRegex', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  for (const date of [1, 10, 20, 30]) {
    test(`ケース: ${date}日以降にマッチ`, () => {
      vi.setSystemTime(new Date(2022, 0, date, 0))

      const gotRegex = new RegExp(createBirthDateRangeRegex())

      for (let i = 1; i <= 31; i++) {
        const d = i.toString().padStart(2, '0')
        const p = `--01-${d}`
        const want = i >= date

        expect(gotRegex.test(p), `${gotRegex} -> ${p}`).toEqual(want)
      }
    })
  }
})
