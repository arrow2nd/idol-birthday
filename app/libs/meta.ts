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
  return [
    { title },
    { name: "description", content: desc },
    { property: "og:site_name", content: title },
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    { property: "og:image", content: ogpUrl },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: desc },
    { property: "twitter:image", content: ogpUrl }
  ]
}
