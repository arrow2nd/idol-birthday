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
      className="block m-2 px-6 py-4 w-72 border-2 bg-white hover:bg-gray-50 rounded-lg transition-colors"
      style={{ borderColor: '#' + color.hex }}
      to={'/' + id}
    >
      <p className="text-xl">{name} さん</p>
      <p className="text-sm text-gray-800">
        {birth.month}月{birth.day}日 / {brand}
      </p>
    </Link>
  )
}
