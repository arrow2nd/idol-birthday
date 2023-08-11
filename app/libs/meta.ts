import { site } from "~/data/site"

/**
 * メタ情報を作成
 * @param title サイトタイトル
 * @param desc サイト詳細
 * @param ogpUrl OGP画像URL
 * @returns メタ情報オブジェクト
 */
export default function createMeta(
  title: string = site.title,
  desc: string = site.desc,
  ogpUrl: string = site.defaultOgpImageUrl
) {
  return {
    title,
    description: desc,
    "og:site_name": title,
    "og:title": title,
    "og:description": desc,
    "og:image": ogpUrl,
    "twitter:card": "summary_large_image",
    "twitter:title": title,
    "twitter:description": desc,
    "twitter:image": ogpUrl
  }
}
