import type { MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch
} from '@remix-run/react'

import styles from './styles/app.css'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'idol-birthday | アイドルのお誕生日まで残り...？',
  viewport: 'width=device-width,initial-scale=1'
})

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export function CatchBoundary() {
  const { status, statusText } = useCatch()

  return (
    <html lang="ja">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="p-8 flex justify-center items-center h-screen">
        <div>
          <h1 className="font-bold text-4xl">{status}</h1>
          <p className="mt-2 text-gray-800">{statusText}</p>
        </div>
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <html lang="ja">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
