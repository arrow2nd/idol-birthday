import { CSSProperties, useReducer } from "react"
import { AiOutlineTwitter } from "react-icons/ai"
import { BsMastodon } from "react-icons/bs"
import { HiCheck } from "react-icons/hi"
import { RiFileCopyFill } from "react-icons/ri"
import { SiMisskey } from "react-icons/si"

import Anchor from "~/components/anchor"

import { createShareData } from "~/libs/tweet"

import { Idol } from "~/types/idol"

type Props = {
  idol: Idol
  count: number
  hash: string
}

type Service = {
  baseUrl: string
  icon: JSX.Element
}

const shareServices: Service[] = [
  {
    baseUrl: "https://twitter.com/intent/tweet",
    icon: <AiOutlineTwitter />
  },
  {
    baseUrl: "https://donshare.net/share.html",
    icon: <BsMastodon />
  },
  {
    baseUrl: "https://misskeyshare.link/share.html",
    icon: <SiMisskey />
  }
]

export default function Share({ idol, count, hash }: Props): JSX.Element {
  const { color } = idol
  const [isCopied, toggleCopied] = useReducer((prev) => !prev, false)
  const shareData = createShareData(idol, count, hash)

  const handleClick = async () => {
    if (isCopied) return

    await navigator.clipboard.writeText(shareData.url)

    toggleCopied()
    setTimeout(() => toggleCopied(), 1500)
  }

  const buttonClassName = `btn border-none hover:brightness-90 transition text-xl ${
    color.isWhitish ? "text-neutral" : "text-white"
  }`

  const buttonStyle: CSSProperties = {
    backgroundColor: "#" + color.hex
  }

  return (
    <div className="space-x-2">
      {shareServices.map(({ baseUrl, icon }) => (
        <Anchor
          suppressHydrationWarning
          key={baseUrl}
          className={buttonClassName}
          style={buttonStyle}
          href={baseUrl + shareData.params}
        >
          {icon}
        </Anchor>
      ))}
      <button
        className={buttonClassName}
        style={buttonStyle}
        onClick={() => handleClick()}
      >
        {isCopied ? <HiCheck /> : <RiFileCopyFill />}
      </button>
    </div>
  )
}
