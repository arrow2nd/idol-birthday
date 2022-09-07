import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function Layout({ children }: Props) {
  return <main className="h-screen px-8">{children}</main>
}
