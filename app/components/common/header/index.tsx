import { RiCake2Line } from 'react-icons/ri'

import { SeatchBar } from './searchbar'

export function Header() {
  return (
    <header className="py-16 flex flex-col items-center">
      <span className="flex items-center text-3xl">
        <RiCake2Line />
        <span className="ml-2 tracking-wider">idol-birthday-countdown</span>
      </span>
      <span className="mt-1 text-gray-800 text-sm">
        アイドルのお誕生日までの秒数をカウントダウンするサイト
      </span>
      <SeatchBar className="mt-8" />
    </header>
  )
}
