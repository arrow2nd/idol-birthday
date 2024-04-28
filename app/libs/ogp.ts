import { Idol } from "~/types/idol"
import { site } from "~/data/site"
import { calcSecondsToBirthday, createJstDayjs } from "./date"
import { VerificationArgs, verificationHash } from "./hash"

/**
 * カウントダウンのOGP画像URLを作成
 * @param name アイドル名
 * @param colorHex カラーコード
 * @param seconds 秒数
 * @returns URL
 */
function createCountdownOgpImageUrl(
  name: string,
  colorHex: string,
  seconds: number
): string {
  const url = new URL("api/og-image", site.url)

  url.searchParams.append("idol", encodeURIComponent(name))
  url.searchParams.append("seconds", seconds.toString())
  url.searchParams.append("color", colorHex.replace("#", ""))

  return url.toString()
}

/**
 * お誕生日のOGP画像を作成
 * @param name アイドル名
 * @param colorHex カラーコード
 * @returns OGP画像URL
 */
function createHpbOgpImageUrl(name: string, colorHex: string): string {
  const url = new URL("api/og-image", site.url)

  url.searchParams.append("idol", encodeURIComponent(name))
  url.searchParams.append("color", colorHex.replace("#", ""))
  url.searchParams.append("hpd", "true")

  return url.toString()
}

/**
 * OGP画像のURLを作成
 * @param idol アイドル情報
 * @param verification 検証情報
 * @returns URL
 */
export function createOgpImageUrl(
  idol: Idol,
  verification: VerificationArgs
): string {
  // ハッシュ値を検証
  if (!verificationHash(verification)) {
    return site.defaultOgpImageUrl
  }

  // タイムスタンプから残り秒数を計算
  const dateWithTimestamp = createJstDayjs(verification.timestamp)
  const seconds = calcSecondsToBirthday(dateWithTimestamp, idol.birth)

  return seconds > 0
    ? createCountdownOgpImageUrl(idol.name, idol.color.hex, seconds)
    : createHpbOgpImageUrl(idol.name, idol.color.hex)
}
