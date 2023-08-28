export default function NotFoundCard(): JSX.Element {
  return (
    <div className="card h-32 flex-1 bg-base-200 text-lg md:h-40">
      <div className="card-body items-center justify-center">
        <span className="text-2xl font-bold tracking-wider md:text-3xl">
          Not Found…
        </span>
        <span className="text-xs">該当するアイドルは見つかりませんでした</span>
      </div>
    </div>
  )
}
