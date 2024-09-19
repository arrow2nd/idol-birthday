import { LoaderFunctionArgs } from "@remix-run/node"
import { Jimp } from "jimp"
import { idolImages } from "~/data/images"

export async function loader({ params }: LoaderFunctionArgs) {
  const imageUrl = idolImages.get(params.name ?? "")

  if (!imageUrl) {
    return new Response(null, { status: 404 })
  }

  // https://github.com/jimp-dev/jimp/tree/main/packages/jimp#basic-usage
  const image = await Jimp.read(imageUrl)

  // 小さめにリサイズ
  const resized = await image
    .resize({ w: 448 })
    .getBuffer("image/jpeg", { quality: 80 })

  return new Response(resized, {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000"
    }
  })
}
