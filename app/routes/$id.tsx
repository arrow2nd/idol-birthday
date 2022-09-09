import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'

import CountDown from '~/components/idol/countdown'
import LinkToHome from '~/components/idol/link'

import { createQuery2SearchById, fetchFromImasparql } from '~/libs/imasparql'
import {
  responseBadRequest,
  responseNotFound,
  responseServerError
} from '~/libs/response'

import { Idol } from '~/types/idol'

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, 'Expected params.id')

  // 英字・アンダースコア3文字以上 + (数字 1 ~ 3桁) 以外の形式なら不正なID
  if (!/^[a-zA-Z_]{3,}(_\d{1,3})?$/.test(params.id)) {
    throw responseBadRequest(`"${params.id}" は不正なIDです`)
  }

  const query = createQuery2SearchById(params.id)
  const data = await fetchFromImasparql(query).catch(() => {
    throw responseServerError()
  })

  // 見つからなかった
  if (data.length <= 0) {
    throw responseNotFound(`"${params.id}" に該当するアイドルが見つかりません`)
  }

  return data[0]
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return {}

  const title = `${data.name}さんのお誕生日まで...？ | idol-birthday`
  const description = `${data.name}さんのお誕生日までの秒数をカウントダウンするサイトです`

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
    <main className="flex flex-col justify-center items-center px-8 h-screen">
      <LinkToHome />
      <CountDown idol={idol} />
    </main>
  )
}
