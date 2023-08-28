import { CSSProperties } from "react"

type Props = {
  name: string
  count: number
}

export default function Count({ name, count }: Props): JSX.Element {
  const numbers = count
    .toString()
    .match(/\d{1,2}/g)!
    .map(Number)

  return (
    <>
      <div>{`${name}さんのお誕生日まで`}</div>
      <div className="space-x-2">
        <span>残り</span>
        <span className="text-5xl font-bold sm:text-6xl">
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
