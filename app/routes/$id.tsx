import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'

import { Idol } from '~/types/idol'

export const loader: LoaderFunction = ({ params }) => {
  invariant(params.id, 'Expected params.id')

  // TODO: このIDから名前, 誕生日, パーソナルカラーを取得して返す
  return {
    id: params.id,
    name: '佐久間まゆ',
    birth: {
      month: 9,
      day: 7
    },
    color: {
      hex: '#D1197B',
      isWhitish: false
    }
  } as Idol
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
    </div>
  )
}
