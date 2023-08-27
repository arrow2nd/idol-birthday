import { LuCake } from "react-icons/lu"
import { RiSearchLine } from "react-icons/ri"

import { site } from "~/data/site"

export default function Search(): JSX.Element {
  return (
    <div className="card basis-full text-base-content bg-base-200">
      <div className="card-body flex-row justify-center items-center">
        <div className="mr-20 text-center">
          <div className="flex flex-row items-center text-2xl">
            <LuCake className="mr-3" />
            <span className="tracking-wider">{site.name}</span>
          </div>
          <span className="text-xs">{site.desc}</span>
        </div>

        <form action="/search" className="form-control">
          <div className="join">
            <input
              className="input join-item w-64"
              type="text"
              name="q"
              placeholder="アイドルの名前から検索"
              required
            />
            <button
              type="submit"
              className="btn btn-neutral join-item text-base"
            >
              <RiSearchLine />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
