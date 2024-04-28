import { Idol } from "~/types/idol"
import GroupTitleCard from "./group-title-card"
import IdolCard from "./idol-card"
import NotFoundCard from "./notfound-card"

type Props = {
  groupCardClassName: string
  groupCardTitle: string
  groupCardText?: string
  idols: Idol[]
}

export default function Idols({
  groupCardClassName,
  groupCardTitle,
  groupCardText,
  idols
}: Props): JSX.Element {
  return (
    <>
      <GroupTitleCard
        className={groupCardClassName}
        title={groupCardTitle}
        text={groupCardText}
      />
      {idols.length > 0 ? (
        idols.map((idol) => <IdolCard key={idol.id} idol={idol} />)
      ) : (
        <NotFoundCard />
      )}
    </>
  )
}
