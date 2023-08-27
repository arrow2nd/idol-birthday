import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="m-auto max-w-screen-xl p-8 md:p-16 flex flex-wrap gap-4">
      {children}
    </div>
  )
}
