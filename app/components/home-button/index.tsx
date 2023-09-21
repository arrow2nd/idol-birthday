import { Link } from "@remix-run/react"
import { FiChevronLeft } from "react-icons/fi"

export default function HomeButton(): JSX.Element {
  return (
    <Link
      className="btn btn-wide fixed inset-x-0 bottom-10 z-20 m-auto rounded-full border-base-content"
      to="/"
    >
      <FiChevronLeft />
      <span>Home</span>
    </Link>
  )
}
