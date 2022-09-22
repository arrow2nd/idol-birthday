import { LoaderFunction, MetaFunction, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { TbListSearch } from 'react-icons/tb'

import Cards from '~/components/common/cards'
import Layout from '~/components/common/layout'

import {
  createQuery2SearchByKeyword,
  fetchFromImasparql
} from '~/libs/imasparql'
import createMeta from '~/libs/meta'
import { responseServerError } from '~/libs/response'

import { SeaechResult } from '~/types/search'

import { site } from '~/data/site'

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

export const meta: MetaFunction = ({ data }) => {
  const title = site.titleTemplate.replace('%s', `"${data.query}" の検索結果`)
  return createMeta(title)
}

export default function Search() {
  const { query, data } = useLoaderData<SeaechResult>()

  return (
    <Layout>
      <Cards
        className="my-16"
        title={`"${query}" の検索結果です`}
        icon={<TbListSearch />}
        idols={data}
      />
    </Layout>
  )
}
