import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import Cards from '~/components/common/cards'
import Layout from '~/components/common/layout'

import {
  createQuery2RecentBirthday,
  fetchFromImasparql
} from '~/libs/imasparql'
import { responseServerError } from '~/libs/response'

import { Idol } from '~/types/idol'

export const loader: LoaderFunction = async () => {
  const query = createQuery2RecentBirthday()

  return await fetchFromImasparql(query).catch(() => {
    throw responseServerError()
  })
}

export default function Index() {
  const idols = useLoaderData<Idol[]>()

  return (
    <Layout>
      <Cards title="もうすぐお誕生日のアイドル + α" idols={idols} />
    </Layout>
  )
}
