import { Link } from '@remix-run/react'
import { RiCake2Line } from 'react-icons/ri'

import { SeatchBar } from './searchbar'

export default function Header() {
  return (
    <header className="py-24 flex flex-col items-center text-center">
      <Link className="flex items-center text-xl sm:text-3xl" to="/">
        <RiCake2Line />
        <span className="ml-2 tracking-wider">idol-birthday-countdown</span>
      </Link>
      <span className="mt-1 text-gray-800 text-xs sm:text-sm">
        アイドルのお誕生日までの秒数をカウントダウンするサイト
      </span>
      <SeatchBar className="mt-8" />
    </header>
  )
}
