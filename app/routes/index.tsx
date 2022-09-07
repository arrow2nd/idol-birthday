import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { GiPartyPopper } from 'react-icons/gi'

import Card from '~/components/common/card'
import Layout from '~/components/common/layout'

import {
  createQuery2RecentBirthday,
  fetchFromImasparql
} from '~/libs/imasparql'

import { Idol } from '~/types/idol'

export const loader: LoaderFunction = async () => {
  const query = createQuery2RecentBirthday()
  const data = await fetchFromImasparql(query)

  return data ?? ([] as Idol[])
}

export default function Index() {
  const idols = useLoaderData<Idol[]>()

  const cards = idols.map((e) => <Card key={e.id} idol={e} />)

  return (
    <Layout>
      <div className="flex justify-center items-center text-md text-gray-800">
        <GiPartyPopper />
        <span className="ml-1">もうすぐお誕生日のアイドル</span>
      </div>
      <div className="mt-6 flex flex-row flex-wrap justify-center">{cards}</div>
    </Layout>
  )
}
