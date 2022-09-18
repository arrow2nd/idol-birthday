import { RiSearchLine } from 'react-icons/ri'

type Props = {
  className?: string
}

export function SeatchBar({ className = '' }: Props) {
  return (
    <form
      action="/search"
      className={`relative w-full max-w-screen-md ${className}`}
    >
      <button
        type="submit"
        className="absolute px-4 inset-y-0 right-0 text-sub hover:text-main transition-colors"
      >
        <RiSearchLine />
      </button>
      <input
        className="form-input w-full pr-12 border-2 border-sub focus:border-main focus:ring-0 rounded-lg transition-colors"
        type="text"
        name="q"
        placeholder="アイドルのお名前で検索"
      />
    </form>
  )
}
