import dayjs, { Dayjs } from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { Birth } from '~/types/idol'

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.tz.setDefault('Asia/Tokyo')

/**
 * 現在のDayjsのオブジェクトを取得
 * @returns 現在の時刻
 */
export function getNowDate(): Dayjs {
  return dayjs().tz()
}

/**
 * 今月の今日以降の日付とマッチする正規表現文字列を作成
 * @returns 正規表現文字列
 */
export function createBirthDateRangeRegex() {
  const now = dayjs().tz()
  const month = now.format('MM')
  const date = now.date()
  const dateOnesPlace = Math.floor(date * 0.1)

  // 10の位の値が同じ期間にマッチ（11日 -> 11 ~ 19）
  const a = date < 10 ? `0[${date}-9]` : `${dateOnesPlace}[${date % 10}-9]`

  // ↑を除く月末までの期間にマッチ（11日 -> 20 ~ 39）
  const b = dateOnesPlace + 1 < 3 ? `|[${dateOnesPlace + 1}-3][0-9]` : ''

  return `--${month}-(${a + b})`
}

/**
 * 現在日時から指定日時までの秒数を計算
 * @param 日時
 * @returns 秒数
 */
export function calcCountdownSecond({ month, day }: Birth): number {
  const now = dayjs().tz()
  const nowMonth = now.month() + 1
  const nowDate = now.date()

  // 既にお誕生日を過ぎているなら、来年にする
  const birthdayYear =
    nowMonth > month || (nowMonth === month && nowDate > day + 1)
      ? now.year() + 1
      : now.year()

  const next = dayjs(`${birthdayYear}-${month}-${day}`).tz()

  return Math.floor(next.unix() - now.unix())
}
