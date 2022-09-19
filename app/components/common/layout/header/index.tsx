import { Link } from '@remix-run/react'
import { RiCake2Line } from 'react-icons/ri'

import { site } from '~/data/site'

import { SeatchBar } from './searchbar'

export default function Header() {
  const { name, desc } = site

  return (
    <header className="py-24 flex flex-col items-center text-center">
      <Link className="flex items-center text-main text-xl sm:text-3xl" to="/">
        <RiCake2Line />
        <span className="ml-2 tracking-wider">{name}</span>
      </Link>
      <span className="mt-1 px-2 text-sub text-xs sm:text-sm">{desc.replace('するサイト', '')}</span>
      <SeatchBar className="mt-8" />
    </header>
  )
}
