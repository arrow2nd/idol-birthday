import { Link } from '@remix-run/react'
import { BsThreeDots } from 'react-icons/bs'
import { RiCake2Line } from 'react-icons/ri'

import Anchor from '~/components/common/anchor'

type Props = {
  className?: string
}

export default function Header({ className = '' }: Props) {
  return (
    <header className={`navbar ${className}`}>
      <div className="navbar-start">
        <Link className="btn btn-ghost normal-case text-2xl" to="/">
          <RiCake2Line />
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost text-xl">
            <BsThreeDots />
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52"
          >
            <li>
              <Link to="/about">このページについて</Link>
            </li>
            <li>
              <Anchor href="https://github.com/arrow2nd/idol-birthday/">
                GitHubでソースをみる
              </Anchor>
            </li>
            <li>
              <Anchor href="https://sparql.crssnky.xyz/imas/">
                im@sparqlでDBをみる
              </Anchor>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
