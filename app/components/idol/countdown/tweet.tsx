import { CSSProperties, useReducer } from 'react'
import { AiOutlineTwitter } from 'react-icons/ai'
import { HiCheck } from 'react-icons/hi'
import { RiFileCopyFill } from 'react-icons/ri'

import Anchor from '~/components/common/anchor'

import { createTweetUrl } from '~/libs/tweet'

import { Idol } from '~/types/idol'

type Props = {
  idol: Idol
  count: number
  hash: string
}

export default function TweetButton({ idol, count, hash }: Props) {
  const { color } = idol
  const [isCopied, toggleCopied] = useReducer((prev) => !prev, false)
  const [tweetUrl, pageUrl] = createTweetUrl(idol, count, hash)

  const handleClick = async () => {
    if (isCopied) return

    await navigator.clipboard.writeText(pageUrl)

    toggleCopied()
    setTimeout(() => toggleCopied(), 1500)
  }

  const buttonClassName = `btn rounded-full border-none hover:brightness-90 transition ${
    color.isWhitish ? 'text-neutral' : 'text-white'
  }`

  const buttonStyle: CSSProperties = {
    backgroundColor: '#' + color.hex
  }

  return (
    <div className="space-x-2">
      <Anchor
        suppressHydrationWarning
        className={buttonClassName}
        style={buttonStyle}
        href={tweetUrl}
      >
        <AiOutlineTwitter className="text-xl" />
        <span className="ml-2 text-base">ツイートする</span>
      </Anchor>
      <button
        className={`${buttonClassName} text-xl`}
        style={buttonStyle}
        onClick={() => handleClick()}
      >
        {isCopied ? <HiCheck /> : <RiFileCopyFill />}
      </button>
    </div>
  )
}
