import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'

import { Idol } from '~/types/idol'

export const loader: LoaderFunction = ({ params }) => {
  invariant(params.id, 'Expected params.id')

  // TODO: このIDから名前, 誕生日, パーソナルカラーを取得して返す
  return {
    id: params.id,
    name: 'hoge',
    birth: {
      month: 9,
      day: 7
    },
    color: {
      hex: '#D1197B',
      isWhitish: false
    }
  } as Idol
}

export default function IdolCountDownPage() {
  const idol = useLoaderData<Idol>()

  return (
    <div>
      <p>{idol.id}</p>
      <p>{idol.name}</p>
    </div>
  )
}
