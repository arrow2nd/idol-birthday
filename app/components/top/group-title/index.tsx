import { FiChevronRight } from "react-icons/fi"

type Props = {
  title: string
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export default function GroupTitle(props: Props): JSX.Element {
  return (
    <div
      {...props}
      className={`card w-64 flex-none text-primary-content ${props.className}`}
    >
      <div className="card-body flex-row items-center">
        <div className="grow text-3xl">
          {props.title.split(" ").map((line) => (
            <p>{line}</p>
          ))}
        </div>
        <FiChevronRight className="text-2xl" />
      </div>
    </div>
  )
}
