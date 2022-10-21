import { RiSearchLine } from 'react-icons/ri'

import { site } from '~/data/site'

export default function Seatch() {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="py-16 max-w-md">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-wider">
            {site.name}
          </h1>
          <p className="mt-1 text-xs sm:text-sm">{site.desc}</p>
          <form
            action="/search"
            className="mt-6 relative w-full max-w-screen-md"
          >
            <button
              type="submit"
              className="absolute px-4 inset-y-0 right-0 text-sub hover:text-neutral transition-colors"
            >
              <RiSearchLine />
            </button>
            <input
              className="input w-full pr-12 bg-base-300"
              type="text"
              name="q"
              placeholder="アイドルのお名前で検索"
            />
          </form>
        </div>
      </div>
    </div>
  )
}
