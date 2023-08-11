import { Idol } from "~/types/idol"

import { site } from "~/data/site"

import { createJstDayjs } from "./date"

type shareData = {
  params: string
  url: string
}

/**
 * シェア用のデータを作成
 * @param idol アイドル情報
 * @param count 秒数
 * @param hash URL検証用ハッシュ
 * @returns シェア用のデータ
 */
export function createShareData(
  { id, name }: Idol,
  count: number,
  hash: string
): shareData {
  const timestamp = createJstDayjs().valueOf()
  const url = `${site.url}/${id}?t=${timestamp}&h=${hash}`

  const text =
    count > 0
      ? `${name}さんのお誕生日まで、残り${count}秒です！`
      : `${name}さんは今日がお誕生日です！！！！🎉🎉🎉`

  const params = `?text=${encodeURIComponent(text)}&url=${encodeURIComponent(
    url
  )}`

  return { params, url }
}
