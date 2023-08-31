import { site } from "~/data/site"

/**
 * メタ情報を作成
 * @param title サイトタイトル
 * @param desc サイト詳細
 * @param ogpUrl OGP画像URL
 * @returns メタ情報オブジェクト
 */
export default function createMeta(
  title?: string,
  desc: string = site.desc,
  ogpUrl: string = site.defaultOgpImageUrl
) {
  const fullTitle = title ? `${title} | ${site.name}` : site.title

  return [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: fullTitle },
    { name: "description", content: desc },
    { property: "og:site_name", content: fullTitle },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: desc },
    { property: "og:image", content: ogpUrl },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:title", content: fullTitle },
    { property: "twitter:description", content: desc },
    { property: "twitter:image", content: ogpUrl }
  ]
}
