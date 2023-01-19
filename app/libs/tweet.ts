import { Idol } from '~/types/idol'

import { site } from '~/data/site'

import { createJstDayjs } from './date'

/**
 * ツイート文を作成
 * @param idol アイドル情報
 * @param count 秒数
 * @param hash URL検証用ハッシュ
 * @returns ツイートURL, カウントダウンページURL
 */
export function createTweetUrl(
  { id, name }: Idol,
  count: number,
  hash: string
): string[] {
  const timestamp = createJstDayjs().valueOf()
  const pageUrl = `${site.url}/${id}?t=${timestamp}&h=${hash}`

  const tweetText =
    count > 0
      ? `${name}さんのお誕生日まで、残り${count}秒です！`
      : `${name}さんは今日がお誕生日です！！！！🎉🎉🎉`

  const tweetUrl = new URL('https://twitter.com/intent/tweet')
  tweetUrl.searchParams.append('text', tweetText)
  tweetUrl.searchParams.append('url', pageUrl)

  return [tweetUrl.href, pageUrl]
}
