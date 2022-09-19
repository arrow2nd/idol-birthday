import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'

import CountDown from '~/components/idol/countdown'
import LinkToHome from '~/components/idol/link'

import { createDayjs } from '~/libs/date'
import { createDateHash } from '~/libs/hash'
import { createQuery2SearchById, fetchFromImasparql } from '~/libs/imasparql'
import {
  responseBadRequest,
  responseNotFound,
  responseServerError
} from '~/libs/response'

import { Idol } from '~/types/idol'

import { site } from '~/data/site'

type LoaderResult = {
  idol: Idol
  ogpImageUrl: string
  dateHash: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.id, 'Expected params.id')

  // 英字・アンダースコア3文字以上 + (数字 1 ~ 3桁) 以外の形式なら不正なID
  if (!/^[a-zA-Z_]{3,}(_\d{1,3})?$/.test(params.id)) {
    throw responseBadRequest(`"${params.id}" は不正なIDです`)
  }

  // idからアイドルを検索
  const query = createQuery2SearchById(params.id)
  const data = await fetchFromImasparql(query).catch(() => {
    throw responseServerError()
  })

  // 該当するアイドルがいない
  if (data.length <= 0) {
    throw responseNotFound(`"${params.id}" に該当するアイドルが見つかりません`)
  }

  const url = new URL(request.url)
  const timestamp = url.searchParams.get('t') ?? '0'
  const hash = url.searchParams.get('h') ?? ''

  // TODO: OGP画像URLを作成

  return {
    idol: data[0],
    ogpImageUrl: '',
    dateHash: createDateHash(createDayjs(), process.env.APP_SECRET!)
  } as LoaderResult
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return {}

  const { idol, ogpImageUrl } = data

  const title = site.title.replace('%s', `${idol.name}さんのお誕生日まで…？`)
  const description = site.descTemplate.replace('%s', `${idol.name}さん`)

  return {
    title,
    description,
    'og:site_name': title,
    'og:title': title,
    'og:description': description,
    'og:image': ogpImageUrl,
    'twitter:card': 'summary',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': ogpImageUrl
  }
}

export default function IdolCountDownPage() {
  const { idol, dateHash } = useLoaderData<LoaderResult>()

  return (
    <main className="flex flex-col justify-center items-center px-8 h-screen">
      <LinkToHome />
      <CountDown idol={idol} hash={dateHash} />
    </main>
  )
}
