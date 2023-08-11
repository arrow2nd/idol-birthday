import { Link } from "@remix-run/react"

import { Idol } from "~/types/idol"

type Props = {
  idol: Idol
}

export default function Card({ idol }: Props) {
  const { id, name, brand, birth, color } = idol

  return (
    <Link
      className="card w-72 m-2 bg-base-100 border-2 hover:brightness-90 transition"
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
