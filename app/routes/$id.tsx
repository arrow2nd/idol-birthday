import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'

import { createQuery2SearchById, fetchFromImasparql } from '~/libs/imasparql'

import { Idol } from '~/types/idol'

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, 'Expected params.id')

  // 英数字 + アンダーバー 以外を含むなら不正なID
  if (!/^[a-zA-Z\d_]+$/.test(params.id)) {
    throw new Response(null, {
      status: 400,
      statusText: `"${params.id}" は不正なIDです`
    })
  }

  const query = createQuery2SearchById(params.id)
  const data = await fetchFromImasparql(query).catch(() => {
    throw new Response(null, {
      status: 500,
      statusText: '現在、im@sparqlにアクセスできません'
    })
  })

  // 見つからなかった
  if (!data) {
    throw new Response(null, {
      status: 404,
      statusText: `"${params.id}" に該当するアイドルが見つかりません`
    })
  }

  return data
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return {}

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
      <p>{idol.name}</p>
      <p>
        {idol.birth.month}月{idol.birth.day}日
      </p>
    </div>
  )
}
