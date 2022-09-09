import { HiOutlineEmojiHappy } from 'react-icons/hi'

import { Idol } from '~/types/idol'

import Card from './card'

type Props = {
  title: string
  idols: Idol[]
}

export default function Cards({ title, idols }: Props) {
  const cards = idols.map((e) => <Card key={e.id} idol={e} />)

  return (
    <>
      <div className="flex justify-center items-center text-main">
        <HiOutlineEmojiHappy className="text-base sm:text-lg" />
        <span className="ml-2 text-sm sm:text-base">{title}</span>
      </div>
      <div className="mt-6 flex flex-row flex-wrap justify-center">
        {cards.length > 0 ? (
          cards
        ) : (
          <p className="text-sub">該当するアイドルはいません</p>
        )}
      </div>
    </>
  )
}
