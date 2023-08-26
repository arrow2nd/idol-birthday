import { Link } from "@remix-run/react"

import { Idol } from "~/types/idol"

export default function IdolCard({ idol }: { idol: Idol }): JSX.Element {
  const { id, name, birthday } = idol

  return (
    <Link
      className="card flex-1 min-w-fit image-full text-primary transition-transform duration-300 hover:scale-105 active:scale-95"
      to={`/${id}`}
    >
      <div className="card-body justify-end">
        <div>
          <div className="font-bold text-3xl tracking-wider">{birthday}</div>
          <div>{name}さん</div>
        </div>
      </div>
    </Link>
  )
}
