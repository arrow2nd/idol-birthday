import { AiOutlineTwitter } from 'react-icons/ai'

import Anchor from '~/components/common/anchor'

import { createJstDayjs } from '~/libs/date'

import { Idol } from '~/types/idol'

import { site } from '~/data/site'

type Props = {
  idol: Idol
  count: number
  hash: string
}

export default function TweetButton({ idol, count, hash }: Props) {
  const { id, name, color } = idol

  const timestamp = createJstDayjs().valueOf()
  const tweet =
    count > 0
      ? `${name}さんのお誕生日まで、残り${count}秒です！`
      : `${name}さんは今日がお誕生日です！！！！🎉🎉🎉`

  const url = new URL('https://twitter.com/intent/tweet')
  url.searchParams.append('text', tweet)
  url.searchParams.append('url', `${site.url}/${id}?t=${timestamp}&h=${hash}`)

  return (
    <Anchor
      suppressHydrationWarning
      className={`btn rounded-full border-none text-base ${
        color.isWhitish ? 'text-neutral' : 'text-white'
      }`}
      style={{ backgroundColor: '#' + color.hex }}
      href={url.href}
    >
      <AiOutlineTwitter className="text-xl" />
      <span className="ml-2">ツイートする</span>
    </Anchor>
  )
}
