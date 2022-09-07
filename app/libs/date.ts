import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.tz.setDefault('Asia/Tokyo')

/**
 * 今日以降の日付とマッチする正規表現文字列を作成
 *
 * 日付の形式は xsd:gMonthDay (`---MM-DD`)
 * @returns 正規表現文字列
 */
export function createBirthDateRangeRegex() {
  const month = dayjs().format('MM')
  const date = dayjs().date()

  const dateOnesPlace = Math.floor(date * 0.1)

  const dateRegex =
    date < 10
      ? `0[${date}-9]|[1-3][0-9]`
      : `${dateOnesPlace}[${date % 10}-9]|[${dateOnesPlace + 1}-3][0-9]`

  return `--${month}-(${dateRegex})`
}
