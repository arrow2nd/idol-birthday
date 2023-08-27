import { Link } from "@remix-run/react"

import { Idol } from "~/types/idol"

export default function IdolCard({ idol }: { idol: Idol }): JSX.Element {
  const { id, name, birthday, color, idolListUrl } = idol

  return (
    <Link
      className="card flex-1 h-32 lg:h-40 image-full text-white transition-transform duration-300 hover:scale-95 active:scale-100"
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
      <div className="card-body p-4 justify-end">
        <div className="w-max">
          <p className="font-bold text-2xl lg:text-3xl tracking-wider">
            {birthday}
          </p>
          <p className="text-sm lg:text-base">{name}さん</p>
        </div>
      </div>
    </Link>
  )
}
