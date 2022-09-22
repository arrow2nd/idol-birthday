import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'

import CountDown from '~/components/idol/countdown'
import LinkToHome from '~/components/idol/link'

import { createJstDayjs } from '~/libs/date'
import { VerificationArgs, createDateHash } from '~/libs/hash'
import { createQuery2SearchById, fetchFromImasparql } from '~/libs/imasparql'
import createMeta from '~/libs/meta'
import { createOgpImageUrl } from '~/libs/ogp'
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

  // 正しい id かどうかチェック
  // NOTE: 英字・アンダースコア3文字以上 + (数字 1 ~ 3桁) 以外なら不正
  if (!/^[a-zA-Z_]{3,}(_\d{1,3})?$/.test(params.id)) {
    throw responseBadRequest(`"${params.id}" は不正なIDです`)
  }

  // id からアイドルを検索
  const query = createQuery2SearchById(params.id)
  const data = await fetchFromImasparql(query).catch(() => {
    throw responseServerError()
  })

  // 該当するアイドルがいない
  if (data.length <= 0) {
    throw responseNotFound(`"${params.id}" に該当するアイドルが見つかりません`)
  }

  // クエリパラメータから検証情報を作成
  const url = new URL(request.url)
  const verification: VerificationArgs = {
    hash: url.searchParams.get('h') ?? '',
    timestamp: parseInt(url.searchParams.get('t') ?? '0'),
    secret: process.env.APP_SECRET!
  }

  return {
    idol: data[0],
    ogpImageUrl: createOgpImageUrl(data[0], verification),
    dateHash: createDateHash(createJstDayjs(), verification.secret!)
  } as LoaderResult
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return {}

  const { titleTemplate, descTemplate } = site
  const { idol, ogpImageUrl } = data

  const title = titleTemplate.replace('%s', `${idol.name}さんのお誕生日まで…？`)
  const desc = descTemplate.replace('%s', `${idol.name}さん`)

  return createMeta(title, desc, ogpImageUrl)
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
