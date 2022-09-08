import { LoaderFunction, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import Cards from '~/components/common/cards'
import Layout from '~/components/common/layout'

import {
  createQuery2SearchByKeyword,
  fetchFromImasparql
} from '~/libs/imasparql'
import { responseServerError } from '~/libs/response'

import { SeaechResult } from '~/types/search'

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')?.trim()

  // クエリがない場合トップへリダイレクトする
  if (!q) {
    return redirect('/')
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

export default function Search() {
  const { query, data } = useLoaderData<SeaechResult>()

  return (
    <Layout>
      <Cards title={`"${query}" の検索結果です`} idols={data} />
    </Layout>
  )
}
