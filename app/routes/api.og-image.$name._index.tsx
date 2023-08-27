import { LoaderArgs } from "@remix-run/node"

import { idolImages } from "~/data/images"
import { site } from "~/data/site"

export async function loader({ params }: LoaderArgs) {
  const imageUrl = idolImages.get(params.name ?? "")

  if (!imageUrl) {
    return new Response(null, { status: 404 })
  }

  const res = await fetch(imageUrl, {
    headers: { "User-Agent": `getOgImageBot (${site.url})` }
  })

  return new Response(res.body, {
    status: 200,
    headers: {
      "Content-Type": "image/jpg",
      "Cache-Control": "public, max-age=7884000, s-maxage=15768000"
    }
  })
}
