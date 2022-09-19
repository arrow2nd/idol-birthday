import { useEffect } from 'react'
import { useReward } from 'react-rewards'

type Props = {
  name: string
}

export default function HappyBirthday({ name }: Props) {
  const colors = [
    '#f34f6d', // アイドルマスター
    '#2681c8', // シンデレラガールズ
    '#faa645', // mミリオンライブ！
    '#ffc30b', // ディアリースターズ
    '#0fbe94', // SideM
    '#8dbbff' // シャイニーカラーズ
  ]

  const { reward: confettiReward } = useReward('confettiReward', 'confetti', {
    lifetime: 600,
    colors
  })
  const { reward: balloonsReward } = useReward('balloonsReward', 'balloons', {
    lifetime: 400,
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

  console.log('[redraw] hpb')

  return (
    <div className="text-left font-bold text-6xl space-y-4">
      <div className="text-2xl">{`${name}さんは`}</div>
      <div>今日がお誕生日</div>
      <div>です！！！🎉🎉🎉</div>
      <span className="absolute top-1/2 left-1/2" id="confettiReward" />
      <span className="absolute bottom-0 left-1/2" id="balloonsReward" />
    </div>
  )
}
