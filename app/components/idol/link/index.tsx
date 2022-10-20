import { RiCake2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'

export default function LinkToHome() {
  return (
    <Link
      className="absolute m-8 top-0 left-0 text-sub hover:text-neutral text-2xl transition-colors"
      to="/"
      title="ホームへ戻る"
    >
      <RiCake2Line />
    </Link>
  )
}
