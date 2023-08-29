import { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import Idols from "~/components/idols"
import Navi from "~/components/navi"

import { createJstDayjs } from "~/libs/date"
import {
  createQuery2RecentBirthday,
  fetchFromImasparql
} from "~/libs/imasparql"
import { responseServerError } from "~/libs/response"

import { Idol } from "~/types/idol"

export const loader: LoaderFunction = async () => {
  // 直近誕生日のアイドルを取得
  const query = createQuery2RecentBirthday()
  const data = await fetchFromImasparql(query).catch(() => {
    throw responseServerError()
  })

  const now = createJstDayjs()
  const month = now.month() + 1
  const date = now.date()

  // 今日誕生日, 近日誕生日の２つに分ける
  const [today, soon] = data.reduce(
    ([pass, fail], e) => {
      return e.birth.month === month && e.birth.date === date
        ? [[...pass, e], fail]
        : [pass, [...fail, e]]
    },
    [[], []] as Idol[][]
  )

  soon.sort((a, b) => {
    const dateA = a.birth.month
    const dateB = b.birth.month

    // 12月が先、1月が後になるようにソート
    if (dateA === 12 && dateB === 1) {
      return -1
    } else if (dateA === 1 && dateB === 12) {
      return 1
    }

    return dateA - dateB // 昇順
  })

  return [today, soon]
}

export default function Index() {
  const [today, soon] = useLoaderData<Idol[][]>()

  return (
    <>
      <Idols
        groupCardClassName="bg-gradient-to-r from-purple-500 to-pink-500"
        groupCardTitle="Happy Birthday!"
        idols={today}
      />
      <Navi />
      <Idols
        groupCardClassName="bg-gradient-to-r from-orange-500 to-yellow-500"
        groupCardTitle="Coming Soon…"
        idols={soon}
      />
    </>
  )
}
