import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { Idol } from "~/types/idol"
import { site } from "~/data/site"
import { createShareData } from "./tweet"

describe("createShareData", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test("誕生日前の場合カウントダウンが含まれている", () => {
    const fakeDate = new Date(2024, 4, 1)
    vi.setSystemTime(fakeDate)

    const data = createShareData(
      {
        id: "ID",
        name: "NAME"
      } as Idol,
      100,
      "HASH"
    )

    const wantUrl = `${site.url}/ID?t=${fakeDate.valueOf()}&h=HASH`

    const text = decodeURIComponent(data.params.replace("?text=", ""))
    expect(text).toBe(`NAMEさんのお誕生日まで、残り100秒です！\n${wantUrl}`)

    expect(data.url).toBe(wantUrl)
  })

  test("誕生日なら特別なメッセージになっている", () => {
    const fakeDate = new Date(2024, 4, 1)
    vi.setSystemTime(fakeDate)

    const data = createShareData(
      {
        id: "ID",
        name: "NAME"
      } as Idol,
      0,
      "HASH"
    )

    const wantUrl = `${site.url}/ID?t=${fakeDate.valueOf()}&h=HASH`

    const text = decodeURIComponent(data.params.replace("?text=", ""))
    expect(text).toBe(`NAMEさんは今日がお誕生日です！！！！🎉🎉🎉\n${wantUrl}`)

    expect(data.url).toBe(wantUrl)
  })
})
