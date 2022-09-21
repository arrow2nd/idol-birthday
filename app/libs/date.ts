import dayjs, { Dayjs } from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { Birth } from '~/types/idol'

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.tz.setDefault('Asia/Tokyo')

/**
 * JSTのDayjsオブジェクトを生成
 *
 * 引数を省略すると、現在の時刻を元に生成します
 * @returns Dayjsオブジェクト
 */
export function createJstDayjs(date?: string | number): Dayjs {
  return dayjs(date).tz()
}

/**
 * 今月の今日以降の日付とマッチする正規表現文字列を作成
 * @returns 正規表現文字列
 */
export function createBirthDateRangeRegex() {
  const now = createJstDayjs()
  const month = now.format('MM')
  const date = now.date()

  // 10の位の値
  const dateOnesPlace = Math.floor(date * 0.1)

  // 10の位の値が同じ期間にマッチ（11日 -> 11 ~ 19）
  const a = date < 10 ? `0[${date}-9]` : `${dateOnesPlace}[${date % 10}-9]`

  // ↑を除く月末までの期間にマッチ（11日 -> 20 ~ 39）
  const b = dateOnesPlace + 1 < 3 ? `|[${dateOnesPlace + 1}-3][0-9]` : ''

  return `--${month}-(${a + b})`
}

/**
 * 開始日時からお誕生日までの秒数を計算
 * @param start 開始日時
 * @param birth 誕生日
 * @returns 秒数
 */
export function calcSecondsToBirthday(start: Dayjs, birth: Birth): number {
  const { month, date } = birth

  const startMonth = start.month() + 1
  const startDate = start.date()

  // 既にお誕生日を過ぎているなら、来年にする
  const birthdayYear =
    startMonth > month || (startMonth === month && startDate > date)
      ? start.year() + 1
      : start.year()

  const next = createJstDayjs(`${birthdayYear}-${month}-${date}`)

  return Math.floor(next.unix() - start.unix())
}
