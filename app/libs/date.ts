import dayjs, { Dayjs } from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

import { Birth } from "~/types/idol"

dayjs.extend(utc)
dayjs.extend(timezone)

/**
 * JSTのDayjsオブジェクトを生成
 *
 * 引数を省略すると、現在の時刻を元に生成します
 * @returns Dayjsオブジェクト
 */
export function createJstDayjs(
  date?: string | number,
  keepLocalTime?: boolean
): Dayjs {
  return dayjs(date).tz("Asia/Tokyo", keepLocalTime ?? false)
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

  const next = createJstDayjs(`${birthdayYear}-${month}-${date} 00:00:00`, true)

  return Math.floor(next.unix() - start.unix())
}
