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
  return data.reduce(
    ([pass, fail], e) => {
      return e.birth.month === month && e.birth.date === date
        ? [[...pass, e], fail]
        : [pass, [...fail, e]]
    },
    [[], []] as Idol[][]
  )
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
