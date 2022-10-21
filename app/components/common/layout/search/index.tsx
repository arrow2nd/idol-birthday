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
            className="form-control mt-6 w-full max-w-screen-md"
          >
            <div className="input-group">
              <input
                className="input input-bordered w-full bg-base-300"
                type="text"
                name="q"
                placeholder="アイドルのお名前で検索"
              />
              <button type="submit" className="btn btn-square">
                <RiSearchLine />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
