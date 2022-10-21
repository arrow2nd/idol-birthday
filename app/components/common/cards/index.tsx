import { Idol } from '~/types/idol'

import Card from './card'

type Props = {
  className?: string
  title: string
  icon: React.ReactNode
  idols: Idol[]
}

export default function Cards({ className = '', title, icon, idols }: Props) {
  const cards = idols.map((e) => <Card key={e.id} idol={e} />)

  return (
    <div className={className}>
      <div className="flex justify-center items-center tracking-widest">
        <span className="text-xl sm:text-2xl">{icon}</span>
        <div className="ml-3 text-md sm:text-xl">{title}</div>
      </div>
      <div className="mt-8 flex flex-row flex-wrap justify-center">
        {cards.length > 0 ? cards : <p>該当するアイドルがいません</p>}
      </div>
    </div>
  )
}
