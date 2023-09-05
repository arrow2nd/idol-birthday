import fontStyles from "@fontsource/azeret-mono/400.css"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError
} from "@remix-run/react"
import { HttpStatusCode } from "axios"
import { BiSolidError } from "react-icons/bi"

import createMeta from "~/libs/meta"

import HomeButton from "./components/home-button"
import styles from "./styles/app.css"

export function meta() {
  return createMeta()
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles
    },
    {
      rel: "stylesheet",
      href: fontStyles
    }
  ]
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

export function ErrorBoundary() {
  const error = useRouteError()

  const status = isRouteErrorResponse(error)
    ? error.status
    : HttpStatusCode.InternalServerError

  const message = isRouteErrorResponse(error)
    ? error.statusText
    : "Unknown error"

  return (
    <html>
      <head>
        <title>ERROR!</title>
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen w-screen items-center justify-center">
        <BiSolidError className="mr-6 text-6xl" />
        <div className="stat w-fit border-l-2">
          <div className="stat-title">ERROR</div>
          <div className="stat-value">{status}</div>
          <div className="stat-desc">{message}</div>
        </div>
        <HomeButton />
        <Scripts />
      </body>
    </html>
  )
}
