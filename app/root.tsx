import "@fontsource/azeret-mono/400.css"
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
import { BiSolidError } from "react-icons/bi"
import createMeta from "~/libs/meta"
import HomeButton from "./components/home-button"
import "./styles/app.css"

export function meta() {
  return createMeta()
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
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "e4612edb1d6e444eac97559d81bbe565"}'
        ></script>
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  const status = isRouteErrorResponse(error) ? error.status : 500
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
