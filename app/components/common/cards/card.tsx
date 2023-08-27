import { Link } from "@remix-run/react"

import { Idol } from "~/types/idol"

type Props = {
  idol: Idol
}

export default function Card({ idol }: Props) {
  const { id, name, brand, birth, color } = idol

  return (
    <Link
      className="card m-2 w-72 border-2 bg-base-100 transition hover:brightness-90"
      style={{ borderColor: "#" + color.hex }}
      to={"/" + id}
    >
      <div className="card-body">
        <p className="card-title">{name} さん</p>
        <p className="text-sm">
          {birth.month}月{birth.date}日 / {brand}
        </p>
      </div>
    </Link>
  )
}
