type Props = {
  name: string
  count: number
}

export default function Count({ name, count }: Props) {
  return (
    <>
      <div>{`${name}さんのお誕生日まで`}</div>
      <div className="space-x-2">
        <span>残り</span>
        <span
          suppressHydrationWarning
          className="text-5xl font-bold sm:text-6xl"
        >
          {count}
        </span>
        <span>秒</span>
      </div>
    </>
  )
}
