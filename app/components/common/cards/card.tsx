import { Link } from '@remix-run/react'

import { Idol } from '~/types/idol'

type Props = {
  idol: Idol
}

export default function Card({ idol }: Props) {
  const { id, name, brand, birth, color } = idol

  // TODO: 白すぎる色の場合ボーダーが見えなくなるのをどうにかする

  return (
    <Link
      className="block m-2 px-6 py-4 w-72 border-2 bg-white hover:brightness-90 rounded-lg transition"
      style={{ borderColor: '#' + color.hex }}
      to={'/' + id}
    >
      <p className="text-lg sm:text-xl text-main">{name} さん</p>
      <p className="text-xs sm:text-sm text-sub">
        {birth.month}月{birth.day}日 / {brand}
      </p>
    </Link>
  )
}
