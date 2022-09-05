import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { fetchIdolData } from '~/libs/fetchIdolData'

import { Idol } from '~/types/idol'

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, 'Expected params.id')

  return await fetchIdolData(params.id)
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title = `${data.name}さんのお誕生日まで...？ | idol-birthday`
  const description = `${data.name}さんのお誕生日までの時間を秒単位でカウントダウンするサイトです`

  return {
    title,
    description,
    'og:site_name': title,
    'og:title': title,
    'og:description': description,
    'twitter:card': 'summary',
    'twitter:title': title,
    'twitter:description': description
  }
}

export default function IdolCountDownPage() {
  const idol = useLoaderData<Idol>()

  return (
    <div>
      <p>{idol.id}</p>
      <p>{idol.name}</p>
      <p>
        {idol.birth.month}月{idol.birth.day}日
      </p>
    </div>
  )
}
