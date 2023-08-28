import { LoaderFunction, V2_MetaFunction, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import CardGroupTitle from "~/components/card/group-title"
import CardIdol from "~/components/card/idol"
import CardNotFound from "~/components/card/notfound"
import Layout from "~/components/layout"
import Navi from "~/components/navi"
import TopButton from "~/components/top-button"

import {
  createQuery2SearchByKeyword,
  fetchFromImasparql
} from "~/libs/imasparql"
import createMeta from "~/libs/meta"
import { responseServerError } from "~/libs/response"

import { SeaechResult } from "~/types/search"

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")?.trim()

  // クエリがない場合トップへリダイレクトする
  if (!q) {
    return redirect("/")
  }

  const query = createQuery2SearchByKeyword(q)
  const data = await fetchFromImasparql(query).catch(() => {
    throw responseServerError()
  })

  return {
    query: q,
    data
  } as SeaechResult
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  const title = `「${data.query}」の検索結果`
  return createMeta(title)
}

export default function SearchResults() {
  const { query, data } = useLoaderData<SeaechResult>()

  return (
    <Layout>
      <Navi />
      <CardGroupTitle
        className="bg-gradient-to-r from-purple-500 to-pink-500"
        title="Results"
        text={query}
      />
      {data.length > 0 ? (
        data.map((idol) => <CardIdol key={idol.id} idol={idol} />)
      ) : (
        <CardNotFound />
      )}
      <TopButton />
    </Layout>
  )
}
