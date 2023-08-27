import { RiSearchLine } from "react-icons/ri"

import Logo from "./logo"

export default function Search(): JSX.Element {
  return (
    <div className="card basis-full text-base-content bg-base-200">
      <div className="card-body flex-col lg:flex-row justify-center items-center">
        <Logo className="mr-0 lg:mr-16 mb-4 lg:mb-0" />

        <form action="/search" className="form-control">
          <div className="lg:join">
            <input
              className="input join-item w-full lg:w-64 mb-2 lg:mb-0"
              type="text"
              name="q"
              placeholder="アイドルの名前から検索"
              required
            />
            <button
              type="submit"
              className="btn btn-neutral join-item w-full lg:w-auto text-base"
            >
              <RiSearchLine />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
