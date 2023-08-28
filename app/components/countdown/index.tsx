import { useState } from "react"
import useInterval from "~/hooks/useInterval"

import { calcSecondsToBirthday, createJstDayjs } from "~/libs/date"

import { Idol } from "~/types/idol"

import HappyBirthday from "./birthday"
import Count from "./count"
import Share from "./share"

type Props = {
  idol: Idol
  hash: string
}

export default function CountDown({ idol, hash }: Props): JSX.Element {
  const { name, birth } = idol

  const [prevDate] = useState<number>(createJstDayjs().date())
  const [count, setCount] = useState<number>(
    calcSecondsToBirthday(createJstDayjs(), birth)
  )

  useInterval(() => {
    // 日付が変わったらリロード
    if (createJstDayjs().date() !== prevDate) {
      window.location.reload()
      return
    }

    if (count > 0) {
      setCount(calcSecondsToBirthday(createJstDayjs(), birth))
    }
  })

  return (
    <div className="space-y-10 text-center text-xl sm:text-2xl">
      {count > 0 ? (
        <Count name={name} count={count} />
      ) : (
        <HappyBirthday name={name} />
      )}
      <Share idol={idol} count={count} hash={hash} />
    </div>
  )
}
