import { describe, expect, test } from "vitest"

import { getBrandColor, isWhitishColor } from "./color"

describe("getBrandColor", () => {
  test("ブランド名からカラーコードを取得できる", () => {
    expect(getBrandColor("765AS")).toBe("F34F6D")
  })

  test("存在しない場合デフォルトのカラーコードが返る", () => {
    expect(getBrandColor("test")).toBe("FF74B8")
  })
})

describe("isWhitishColor", () => {
  test("白っぽい色", () => {
    expect(isWhitishColor("FCFAD4")).toBeTruthy()
  })

  test("黒っぽい色", () => {
    expect(isWhitishColor("144384")).toBeFalsy()
  })
})
