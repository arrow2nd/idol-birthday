import cloudinary from "cloudinary"
import { Idol } from "~/types/idol"
import { site } from "~/data/site"
import { calcSecondsToBirthday, createJstDayjs } from "./date"
import { VerificationArgs, verificationHash } from "./hash"

/**
 * Cloudinary用に文字列をエンコード
 * @param text 文字列
 * @returns エンコードされた文字列
 */
const encode4Cloudinary = (text: string) => {
  return encodeURIComponent(
    text.replace(/\,/g, "%2C").replace(/\//g, "%2F").replace(/!/g, "%21")
  )
}

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
  return cloudinary.v2.url("idol-birthday-countdown/countdown.png", {
    secure: true,
    sign_url: true,
    transformation: [
      {
        variables: [
          ["$idol", `!${encode4Cloudinary(name)}!`],
          ["$seconds", `!${seconds}!`],
          ["$color", `!rgb:${colorHex.replace("#", "")}!`]
        ]
      },
      {
        transformation: ["idol-countdown"]
      }
    ]
  })
}

/**
 * お誕生日のOGP画像を作成
 * @param name アイドル名
 * @param colorHex カラーコード
 * @returns OGP画像URL
 */
function createHpbOgpImageUrl(name: string, colorHex: string): string {
  return cloudinary.v2.url("idol-birthday-countdown/hpb.png", {
    secure: true,
    sign_url: true,
    transformation: [
      {
        variables: [
          ["$idol", `!${encode4Cloudinary(name)}!`],
          ["$color", `!rgb:${colorHex.replace("#", "")}!`]
        ]
      },
      {
        transformation: ["idol-hpb"]
      }
    ]
  })
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
