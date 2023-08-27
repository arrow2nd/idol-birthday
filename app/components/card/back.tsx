import { Link } from "@remix-run/react"
import { FiChevronLeft } from "react-icons/fi"

export default function CardBackToTop(): JSX.Element {
  return (
    <div className="card bg-accent text-xl text-base-100 transition-transform duration-300 hover:scale-95 active:scale-100">
      <Link className="card-body justify-center px-4" to="/">
        <FiChevronLeft />
      </Link>
    </div>
  )
}
