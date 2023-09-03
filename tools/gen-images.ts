import { writeFileSync } from "node:fs"

;(async () => {
  type OgImage = {
    name: string
    url: string
  }

  const res = await fetch("https://arrow2nd.github.io/idol-og-images/data.json")
  const ogImages = (await res.json()) as OgImage[]

  const data = ogImages
    .map(({ name, url }) => `["${name}", "${url}"]`)
    .join(",")

  const out = `export const idolImages = new Map([${data}]);`
  writeFileSync("./app/data/images.ts", out)
})()
