import { ComponentPropsWithRef } from "react"
import { LuCake } from "react-icons/lu"

import { site } from "~/data/site"

export default function Logo(props: ComponentPropsWithRef<"div">): JSX.Element {
  return (
    <div {...props} className={`text-center ${props.className}`}>
      <div className="flex justify-center items-center text-2xl">
        <LuCake className="mr-2" />
        <span className="font-bold md:tracking-wider">{site.name}</span>
      </div>
      <span className="text-xs">{site.desc}</span>
    </div>
  )
}
