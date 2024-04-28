import { Outlet } from "@remix-run/react"
import Footer from "~/components/footer"

export default function LayoutMain(): JSX.Element {
  return (
    <main className="m-auto max-w-screen-xl p-8 md:p-16">
      <div className="flex flex-wrap gap-4">
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}
