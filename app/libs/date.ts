import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.tz.setDefault('Asia/Tokyo')

/**
 * 今月の今日以降の日付とマッチする正規表現文字列を作成
 * @returns 正規表現文字列
 */
export function createBirthDateRangeRegex() {
  const now = dayjs()
  const month = now.format('MM')
  const date = now.date()
  const dateOnesPlace = Math.floor(date * 0.1)

  // 10の位の値が同じ期間にマッチ（11日 -> 11 ~ 19）
  const a = date < 10 ? `0[${date}-9]` : `${dateOnesPlace}[${date % 10}-9]`

  // ↑を除く月末までの期間にマッチ（11日 -> 20 ~ 39）
  const b = dateOnesPlace + 1 < 3 ? `|[${dateOnesPlace + 1}-3][0-9]` : ''

  return `--${month}-(${a + b})`
}
