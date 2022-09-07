import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { Header } from '~/components/common/header'
import { Layout } from '~/components/common/layout'

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') ?? ''

  // TODO: クエリパラメータからim@sparqlで検索する

  return q
}

export default function Search() {
  const results = useLoaderData<string>()

  return (
    <Layout>
      <Header />
      <p>検索クエリ : {results}</p>
    </Layout>
  )
}
