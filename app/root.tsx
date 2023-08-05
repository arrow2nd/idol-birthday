import type { MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError
} from '@remix-run/react'

import createMeta from '~/libs/meta'

import styles from './styles/app.css'

const Analytics = (): JSX.Element => (
  <script
    defer
    src="https://static.cloudflareinsights.com/beacon.min.js"
    data-cf-beacon='{"token": "e4612edb1d6e444eac97559d81bbe565"}'
  />
)

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
  ...createMeta()
})

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    const { status, statusText } = error

    return (
      <div className="p-8 flex justify-center items-center h-screen text-neutral">
        <h1 className="font-bold text-4xl">{status}</h1>
        <p className="mt-2">{statusText}</p>
      </div>
    )
  }

  return (
    <div className="p-8 flex justify-center items-center h-screen text-neutral">
      <h1 className="font-bold text-4xl">未知のエラーが発生しました</h1>
    </div>
  )
}

export default function App() {
  return (
    <html lang="ja">
      <head>
        <Meta />
        <Links />
        <Analytics />
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
