import { useState } from 'react'
import useInterval from '~/hooks/useInterval'

import { calcCountdownSecond } from '~/libs/date'

import { Idol } from '~/types/idol'

import TweetButton from './tweet'

type Props = {
  idol: Idol
}

export default function CountDown({ idol }: Props) {
  const { name, color, birth } = idol
  const [count, setCount] = useState<number>(calcCountdownSecond(birth))

  useInterval(() => {
    setCount(calcCountdownSecond(birth))
  })

  return (
    <div className="space-y-10 text-center text-main text-xl sm:text-2xl">
      <div>{`${name}さんのお誕生日まで`}</div>
      <div className="space-x-2">
        <span>残り</span>
        <span
          suppressHydrationWarning
          className="text-5xl sm:text-6xl font-bold"
        >
          {count}
        </span>
        <span>秒</span>
      </div>
      <TweetButton color={color} />
    </div>
  )
}
