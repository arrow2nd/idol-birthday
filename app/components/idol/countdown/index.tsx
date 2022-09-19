import { useState } from 'react'
import useInterval from '~/hooks/useInterval'

import { calcCountdownSecond, getNowDate } from '~/libs/date'

import { Idol } from '~/types/idol'

import HappyBirthday from './birthday'
import Count from './count'
import TweetButton from './tweet'

type Props = {
  idol: Idol
}

export default function CountDown({ idol }: Props) {
  const { name, birth } = idol

  const [prevDate] = useState<number>(getNowDate().date())
  const [count, setCount] = useState<number>(calcCountdownSecond(birth))

  useInterval(() => {
    // 日付が変わったらリロード
    if (getNowDate().date() !== prevDate) {
      window.location.reload()
      return
    }

    if (count > 0) {
      setCount(calcCountdownSecond(birth))
    }
  })

  return (
    <div className="space-y-10 text-center text-main text-xl sm:text-2xl">
      {count > 0 ? (
        <Count name={name} count={count} />
      ) : (
        <HappyBirthday name={name} />
      )}
      <TweetButton count={count} idol={idol} />
    </div>
  )
}
