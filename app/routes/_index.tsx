import { LoaderFunction } from "@remix-run/node"
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError
} from "@remix-run/react"
import { HttpStatusCode } from "axios"

import CardGroupTitle from "~/components/card/group-title"
import CardIdol from "~/components/card/idol"
import Layout from "~/components/layout"
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
    <Layout>
      <CardGroupTitle
        className="bg-gradient-to-r from-purple-500 to-pink-500"
        title="Happy Birthday!"
      />
      {today.map((idol) => (
        <CardIdol key={idol.id} idol={idol} />
      ))}
      <Navi />
      <CardGroupTitle
        className="bg-gradient-to-r from-orange-500 to-yellow-500"
        title="Coming Soon…"
      />
      {soon.map((idol) => (
        <CardIdol key={idol.id} idol={idol} />
      ))}
    </Layout>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  const status = isRouteErrorResponse(error)
    ? error.status
    : HttpStatusCode.InternalServerError

  const message = isRouteErrorResponse(error)
    ? error.statusText
    : "Unknown error"

  return (
    <Layout>
      <div className="flex h-screen items-center justify-center p-8 text-neutral">
        <h1 className="text-4xl font-bold">{status}</h1>
        <p className="mt-2">{message}</p>
      </div>
    </Layout>
  )
}
