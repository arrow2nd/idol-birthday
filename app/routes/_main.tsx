import { Outlet } from "@remix-run/react"

export default function LayoutMain(): JSX.Element {
  return (
    <div className="m-auto flex max-w-screen-xl flex-wrap gap-4 p-8 md:p-16">
      <Outlet />
    </div>
  )
}
