import { LoaderArgs } from "@remix-run/node"
import Jimp from "jimp"

import { idolImages } from "~/data/images"
import { site } from "~/data/site"

export async function loader({ params }: LoaderArgs) {
  const imageUrl = idolImages.get(params.name ?? "")

  if (!imageUrl) {
    return new Response(null, { status: 404 })
  }

  // NOTE:
  // Basic usage にオブジェクト(URLOptions)を渡す使い方があるものの、なぜか該当するオーバーロードがないので any にしています
  // https://github.com/jimp-dev/jimp/tree/main/packages/jimp#basic-usage
  const image = await Jimp.read({
    url: imageUrl,
    headers: { "User-Agent": `getOgImageBot (${site.url})` }
  } as any)

  // 半分にリサイズ
  const resized = await image
    .resize(640, Jimp.AUTO)
    .getBufferAsync(Jimp.MIME_JPEG)

  return new Response(resized, {
    status: 200,
    headers: {
      "Content-Type": Jimp.MIME_JPEG,
      "Cache-Control": "public, max-age=31536000"
    }
  })
}
