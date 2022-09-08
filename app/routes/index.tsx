import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { GiPartyPopper } from 'react-icons/gi'

import Card from '~/components/common/card'
import Layout from '~/components/common/layout'

import {
  createQuery2RecentBirthday,
  fetchFromImasparql
} from '~/libs/imasparql'
import { responseServerError } from '~/libs/response'

import { Idol } from '~/types/idol'

export const loader: LoaderFunction = async () => {
  const query = createQuery2RecentBirthday()
  const data = await fetchFromImasparql(query).catch(() => {
    throw responseServerError()
  })

  return data ?? ([] as Idol[])
}

export default function Index() {
  const idols = useLoaderData<Idol[]>()
  const cards = idols.map((e) => <Card key={e.id} idol={e} />)

  return (
    <Layout>
      <div className="flex justify-center items-center text-sm sm:text-base">
        <GiPartyPopper />
        <span className="ml-2">もうすぐお誕生日のアイドル + α</span>
      </div>
      <div className="mt-8 flex flex-row flex-wrap justify-center">
        {cards.length > 0 ? (
          cards
        ) : (
          <p className="text-gray-800">該当するアイドルはいません</p>
        )}
      </div>
    </Layout>
  )
}
