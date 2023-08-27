import { useEffect } from "react"
import { useReward } from "react-rewards"

import { brandColors } from "~/libs/color"

type Props = {
  name: string
}

export default function HappyBirthday({ name }: Props) {
  const colors = [...brandColors.values()].map((e) => "#" + e)

  const { reward: confettiReward } = useReward("confettiReward", "confetti", {
    lifetime: 600,
    colors
  })

  const { reward: balloonsReward } = useReward("balloonsReward", "balloons", {
    lifetime: 350,
    spread: 80,
    startVelocity: 5,
    elementCount: 15,
    elementSize: 40,
    colors
  })

  // 初回表示時に演出を再生
  useEffect(() => {
    confettiReward()
    balloonsReward()
  }, [])

  return (
    <div className="space-y-4 text-left text-4xl font-bold sm:text-6xl">
      <div className="text-xl sm:text-2xl">{`${name}さんは`}</div>
      <div>今日がお誕生日</div>
      <div>です！！！🎉🎉🎉</div>
      <span className="absolute left-1/2 top-1/2" id="confettiReward" />
      <span className="absolute bottom-0 left-1/2" id="balloonsReward" />
    </div>
  )
}
