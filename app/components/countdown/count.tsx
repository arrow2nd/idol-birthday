import { CSSProperties } from "react"

type Props = {
  name: string
  count: number
}

export default function Count({ name, count }: Props): JSX.Element {
  // カウントダウンを偶数桁の数字列に
  const countLength = count.toString().length
  const paddingLength = countLength % 2 === 0 ? countLength : countLength + 1
  const paddingNumber = count.toString().padStart(paddingLength, "0")

  // 2桁ずつ分割
  const numbers = paddingNumber.match(/\d{2}/g)!.map(Number)

  return (
    <>
      <div>{`${name}さんのお誕生日まで`}</div>
      <div className="space-x-2">
        <span>残り</span>
        <span className="-space-x-1 text-5xl font-bold sm:text-6xl">
          {numbers.map((n, i) => (
            <span className="countdown" key={i}>
              <span
                suppressHydrationWarning
                style={{ "--value": n } as CSSProperties}
              ></span>
            </span>
          ))}
        </span>
        <span>秒</span>
      </div>
    </>
  )
}
