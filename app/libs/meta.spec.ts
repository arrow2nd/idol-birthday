import { describe, expect, test } from "vitest"

import { site } from "~/data/site"

import createMeta from "./meta"

describe("createMeta", () => {
  test("サイトタイトルがある場合末尾にサイト名が入る", () => {
    const meta = createMeta("TITLE")
    expect(meta[2].title).toBe(`TITLE | ${site.name}`)
  })

  test("サイトタイトルが省略された場合サイト名のみになっている", () => {
    const meta = createMeta()
    expect(meta[2].title).toBe(site.title)
  })
})
