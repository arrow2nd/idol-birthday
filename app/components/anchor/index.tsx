import { ComponentPropsWithRef } from "react"

export default function Anchor(props: ComponentPropsWithRef<"a">): JSX.Element {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  )
}
