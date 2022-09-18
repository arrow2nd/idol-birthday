import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { HiOutlineEmojiHappy } from 'react-icons/hi'
import { TbCalendarTime } from 'react-icons/tb'

import Cards from '~/components/common/cards'
import Layout from '~/components/common/layout'

import { getNowDate } from '~/libs/date'
import {
  createQuery2RecentBirthday,
  fetchFromImasparql
} from '~/libs/imasparql'
import { responseServerError } from '~/libs/response'

import { Idol } from '~/types/idol'

export const loader: LoaderFunction = async () => {
  // 直近誕生日のアイドルを取得
  const query = createQuery2RecentBirthday()
  const data = await fetchFromImasparql(query).catch(() => {
    throw responseServerError()
  })

  const now = getNowDate()
  const month = now.month() + 1
  const date = now.date()

  // 今日誕生日, 近日誕生日の２つに分ける
  return data.reduce(
    ([pass, fail], e) => {
      return e.birth.month === month && e.birth.day === date
        ? [[...pass, e], fail]
        : [pass, [...fail, e]]
    },
    [[], []] as Idol[][]
  )
}

export default function Index() {
  const [today, soon] = useLoaderData<Idol[][]>()

  return (
    <Layout>
      {today.length > 0 && (
        <Cards
          className="mb-16"
          title="今日お誕生日のアイドル・スタッフ"
          icon={<HiOutlineEmojiHappy />}
          idols={today}
        />
      )}
      <Cards
        title="もうすぐお誕生日のアイドル・スタッフ"
        icon={<TbCalendarTime />}
        idols={soon}
      />
    </Layout>
  )
}
