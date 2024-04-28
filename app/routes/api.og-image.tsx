import { LoaderFunctionArgs } from "@remix-run/node"
import { ImageResponse } from "@vercel/og"
import OgImageCountdown from "~/components/og-image/countdown"
import OgImageHpb from "~/components/og-image/hpb"

export async function loader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams

  const idol = decodeURIComponent(searchParams.get("idol") ?? "")
  const seconds = searchParams.get("seconds")
  const color = searchParams.get("color")
  const isHpd = searchParams.get("hpb") === "true"

  if (!idol || !color || seconds === null) {
    return new Response(null, {
      status: 400
    })
  }

  const text = isHpd
    ? [`${idol}さんは`, "今日がお誕生日", "です！！！🎉🎉🎉"]
    : [`${idol}さんのお誕生日まで`, "残り", seconds.toString(), "秒"]

  // 必要な分のフォントデータを取得
  const kosugiMaru = await fetchFont(text.join(""), "Kosugi Maru")

  if (!kosugiMaru) {
    return new Response(null, {
      status: 500
    })
  }

  const OgImageComponent = isHpd ? OgImageHpb : OgImageCountdown

  return new ImageResponse(<OgImageComponent color={color} text={text} />, {
    debug: true,
    width: 1280,
    height: 630,
    fonts: [
      {
        name: "Kosugi Maru",
        data: kosugiMaru
      }
    ],
    emoji: "noto"
  })
}

/**
 * Google Fonts からポエムの表示に必要なフォントを取得する
 * 参考: https://github.com/vercel/satori/blob/29fe2e4a9676a1ba41c361ec1a547d6de329b039/playground/pages/api/font.ts#L86
 * @param text テキスト
 * @param family フォントファミリー
 * @returns フォントデータ
 */
async function fetchFont(
  text: string,
  family: string
): Promise<ArrayBuffer | null> {
  const endpoint = new URL("https://fonts.googleapis.com/css2")
  endpoint.searchParams.append("family", family)
  endpoint.searchParams.append("text", text)

  const css = await (
    await fetch(endpoint.toString(), {
      headers: {
        // Make sure it returns TTF.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"
      }
    })
  ).text()

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (!resource) return null

  const res = await fetch(resource[1])
  if (!res.ok) {
    return null
  }

  return res.arrayBuffer()
}
