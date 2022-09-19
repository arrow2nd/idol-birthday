import { AiOutlineTwitter } from 'react-icons/ai'

import Anchor from '~/components/common/anchor'

import { createDayjs } from '~/libs/date'

import { Idol } from '~/types/idol'

type Props = {
  count: number
  idol: Idol
}

export default function TweetButton({ count, idol }: Props) {
  const { id, name, color } = idol

  const timestamp = createDayjs().unix()
  const tweet =
    count > 0
      ? `${name}さんのお誕生日まで、残り${count}秒です！`
      : `${name}さんは今日は今日がお誕生日です！！！！🎉🎉🎉`

  const url = new URL('https://twitter.com/intent/tweet')
  url.searchParams.append('text', tweet)
  url.searchParams.append('url', `/${id}?t=${timestamp}&h=hash`)

  return (
    <Anchor
      suppressHydrationWarning
      className={`inline-flex items-center px-6 py-1 text-base sm:text-lg ${
        color.isWhitish ? 'text-main border' : 'text-white'
      } rounded-full shadow-md cursor-pointer hover:brightness-75 transition`}
      style={{ backgroundColor: '#' + color.hex }}
      href={url.href}
    >
      <AiOutlineTwitter className="text-xl" />
      <span className="ml-2">ツイートする</span>
    </Anchor>
  )
}
