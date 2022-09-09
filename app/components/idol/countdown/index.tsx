import { Idol } from '~/types/idol'

import TweetButton from './tweet'

type Props = {
  idol: Idol
}

export default function CountDown({ idol }: Props) {
  const { name, color } = idol

  return (
    <div className="space-y-10 text-center text-main text-2xl">
      <div>{`${name}さんのお誕生日まで`}</div>
      <div className="space-x-2">
        <span>残り</span>
        <span className="text-6xl font-bold">{100000}</span>
        <span>秒</span>
      </div>
      <TweetButton color={color} />
    </div>
  )
}
