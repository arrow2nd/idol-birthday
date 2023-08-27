import { RiSearchLine } from "react-icons/ri"

import Logo from "./logo"

export default function Search(): JSX.Element {
  return (
    <div className="card basis-full bg-base-200 text-base-content">
      <div className="card-body flex-col items-center justify-center md:flex-row">
        <Logo className="mb-4 mr-0 md:mb-0 md:mr-8 lg:mr-16" />

        <form action="/search" className="form-control">
          <div className="md:join">
            <input
              className="input join-item mb-2 w-full md:mb-0 md:w-64"
              type="text"
              name="q"
              placeholder="アイドルの名前から検索"
              required
            />
            <button
              type="submit"
              className="btn btn-neutral join-item w-full text-base md:w-auto"
            >
              <RiSearchLine />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
