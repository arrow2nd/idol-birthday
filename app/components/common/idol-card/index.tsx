import { Link } from "@remix-run/react"

import { Idol } from "~/types/idol"

export default function IdolCard({ idol }: { idol: Idol }): JSX.Element {
  const { id, name, birthday, idolListUrl } = idol

  return (
    <Link
      className="card flex-1 min-w-fit h-40 image-full text-white transition-transform duration-300 hover:scale-105 active:scale-95"
      to={`/${id}`}
    >
      {idolListUrl && (
        <figure>
          <img
            className="w-full object-top"
            src={`/api/og-image/${encodeURIComponent(name)}`}
            alt={name}
          />
        </figure>
      )}
      <div className="card-body p-4 justify-end">
        <div>
          <div className="font-bold text-3xl tracking-wider">{birthday}</div>
          <div>{name}さん</div>
        </div>
      </div>
    </Link>
  )
}
