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
      <main className="flex-1 bg-back">
        <div className="w-full mx-auto px-4 max-w-screen-lg">{children}</div>
      </main>
      <Footer />
    </main>
  )
}
