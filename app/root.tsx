import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react"

import createMeta from "~/libs/meta"

import styles from "./styles/app.css"

const Analytics = (): JSX.Element => (
  <script
    defer
    src="https://static.cloudflareinsights.com/beacon.min.js"
    data-cf-beacon='{"token": "e4612edb1d6e444eac97559d81bbe565"}'
  />
)

export function meta() {
  return createMeta()
}

export function links() {
  return [{ rel: "stylesheet", href: styles }]
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
