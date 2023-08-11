import { ReactNode } from "react"

import Footer from "./footer"
import Header from "./header"
import Search from "./search"

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen">
      <Header className="border-b border-base-300" />
      <Search />
      <div className="flex-1">
        <div className="w-full mx-auto px-4 max-w-screen-lg">{children}</div>
      </div>
      <Footer />
    </div>
  )
}
