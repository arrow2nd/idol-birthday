import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="m-auto flex max-w-screen-xl flex-wrap gap-4 p-8 md:p-16">
      {children}
    </div>
  )
}
