import { ReactNode } from 'react'

import Footer from './footer'
import Header from './header'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <main className="flex flex-col mx-auto px-8 max-w-screen-lg h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </main>
  )
}
