import { Link } from "@remix-run/react"

import { Idol } from "~/types/idol"

export default function IdolCard({ idol }: { idol: Idol }): JSX.Element {
  const { id, name, birthday, color, idolListUrl } = idol

  return (
    <Link
      className="card image-full h-32 flex-1 text-white transition-transform duration-300 hover:scale-95 active:scale-100 md:h-40"
      style={{ backgroundColor: `#${color.hex}` }}
      to={`/${id}`}
    >
      {idolListUrl && (
        <figure>
          <img
            className="w-full object-top"
            src={`/api/og-image/${encodeURIComponent(name)}`}
            alt={name}
            loading="lazy"
          />
        </figure>
      )}
      <div className="card-body justify-end p-4">
        <div className="w-max">
          <p className="text-2xl font-bold tracking-wider md:text-3xl">
            {birthday}
          </p>
          <p className="text-sm md:text-base">{name}さん</p>
        </div>
      </div>
    </Link>
  )
}
