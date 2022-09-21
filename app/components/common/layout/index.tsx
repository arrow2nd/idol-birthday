import { ReactNode } from 'react'

import Footer from './footer'
import Header from './header'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <main className="flex flex-col h-screen">
      <Header />
      <main className="px-8 sm:px-24 flex-1 bg-back">{children}</main>
      <Footer />
    </main>
  )
}
