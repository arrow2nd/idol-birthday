import { AiOutlineTwitter } from 'react-icons/ai'

import Anchor from '~/components/common/anchor'

import { Color } from '~/types/idol'

type Props = {
  color: Color
}

export default function TweetButton({ color }: Props) {
  return (
    <Anchor
      className={`inline-flex items-center px-6 py-1 text-base sm:text-lg ${
        color.isWhitish ? 'text-main border' : 'text-white'
      } rounded-full shadow-md cursor-pointer hover:brightness-75 transition`}
      style={{ backgroundColor: '#' + color.hex }}
      href="https://twitter.com/intent/tweet"
    >
      <AiOutlineTwitter className="text-xl" />
      <span className="ml-2">ツイートする</span>
    </Anchor>
  )
}
