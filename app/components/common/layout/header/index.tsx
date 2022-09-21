import { Link } from '@remix-run/react'
import { RiCake2Line } from 'react-icons/ri'

import { site } from '~/data/site'

import { SeatchBar } from './searchbar'

export default function Header() {
  const { name, desc } = site

  return (
    <header className="px-8 pt-24 pb-16 flex flex-col items-center text-center border-b">
      <div className="absolute top-4 w-full flags" />
      <Link className="flex items-center text-main text-2xl sm:text-3xl" to="/">
        <RiCake2Line />
        <span className="ml-2 tracking-wide sm:tracking-wider">{name}</span>
      </Link>
      <span className="mt-1 px-2 text-sub text-xs sm:text-sm">
        {desc.replace('するサイト', '')}
      </span>
      <SeatchBar className="mt-8" />
    </header>
  )
}
