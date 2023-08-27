import { ComponentPropsWithRef } from "react"

export default function Anchor(props: ComponentPropsWithRef<"a">) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  )
}
