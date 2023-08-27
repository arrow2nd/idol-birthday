import { FiChevronRight } from "react-icons/fi"

type Props = {
  title: string
  text?: string
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export default function GroupTitle(props: Props): JSX.Element {
  return (
    <div
      {...props}
      className={`card h-32 w-full flex-none text-base-100 md:h-40 md:w-64 ${props.className}`}
    >
      <div className="card-body flex-row items-center">
        <div className="grow text-2xl font-bold md:text-3xl">
          {props.title.split(" ").map((line) => (
            <p key={line}>{line}</p>
          ))}
          {props.text && <p className="truncate text-xl">{props.text}</p>}
        </div>
        <FiChevronRight className="text-2xl" />
      </div>
    </div>
  )
}
