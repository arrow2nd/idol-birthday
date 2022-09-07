import { RiSearchLine } from 'react-icons/ri'

type Props = {
  className?: string
}

export function SeatchBar({ className = '' }: Props) {
  return (
    <form action="/search" className={`relative w-3/4 ${className}`}>
      <button
        type="submit"
        className="absolute px-4 inset-y-0 right-0 hover:text-blue-500 transition-colors"
      >
        <RiSearchLine />
      </button>
      <input
        className="form-input w-full pr-12 border-2 border-gray-800 rounded-lg"
        type="text"
        name="q"
        placeholder="アイドルのお名前で検索"
      />
    </form>
  )
}
