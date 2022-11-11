import { describe, expect } from 'vitest'

import { getBrandColor, isWhitishColor } from './color'

describe('getBrandColor', () => {
  test.each([
    ['ShinyColors', '8DBBFF'],
    ['hoge', 'FF74B8']
  ])('正しい色を返せるか（ケース: $s）', (input, want) => {
    expect(getBrandColor(input)).toEqual(want)
  })
})

describe('isWhitishColor', () => {
  test.each([
    ['89C3EB', true],
    ['FFC602', true],
    ['653A2A', false],
    ['F30100', false]
  ])('正しく判定されるか（ケース: $s）', (input, want) => {
    expect(isWhitishColor(input)).toEqual(want)
  })
})
