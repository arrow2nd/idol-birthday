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
      className={`card w-full lg:w-64 h-32 lg:h-40 flex-none text-base-100 ${props.className}`}
    >
      <div className="card-body flex-row items-center">
        <div className="grow font-bold text-2xl lg:text-3xl">
          {props.title.split(" ").map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <FiChevronRight className="text-2xl" />
      </div>
    </div>
  )
}
