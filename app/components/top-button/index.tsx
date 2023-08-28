import { Link } from "@remix-run/react"
import { FiChevronLeft } from "react-icons/fi"

export default function TopButton(): JSX.Element {
  return (
    <Link
      className="btn btn-wide fixed inset-x-0 bottom-10 m-auto rounded-full border-base-content"
      to="/"
    >
      <FiChevronLeft />
      <span>Back</span>
    </Link>
  )
}
