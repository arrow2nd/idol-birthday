import { RiSearchLine } from "react-icons/ri"

export default function Form(): JSX.Element {
  return (
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
          className="btn join-item btn-neutral w-full text-base md:w-auto"
        >
          <RiSearchLine />
        </button>
      </div>
    </form>
  )
}
