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

export function CatchBoundary() {
  const { status, statusText } = useCatch()

  return (
    <html lang="ja">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
        <Analytics />
      </head>
      <body className="p-8 flex justify-center items-center h-screen text-main">
        <div>
          <h1 className="font-bold text-4xl">{status}</h1>
          <p className="mt-2 text-sub">{statusText}</p>
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
