import { Dayjs } from "dayjs"
import crypto from "node:crypto"
import { createJstDayjs } from "./date"

/**
 * 日付のハッシュ値を作成
 * @param date Dayjsオブジェクト
 * @param secret シークレット
 * @returns ハッシュ値（MD5）
 */
export function createDateHash(date: Dayjs, secret: string): string {
  const fullDate = date.format("YYYYMD")

  return crypto
    .createHash("md5")
    .update(fullDate + secret)
    .digest("hex")
}

export type VerificationArgs = {
  hash: string
  timestamp: number
  secret: string
}

/**
 * 日付のハッシュ値を検証
 * @param 検証情報
 * @returns 結果
 */
export function verificationHash({
  hash,
  timestamp,
  secret
}: VerificationArgs): boolean {
  const nowTimestamp = createJstDayjs().valueOf()

  // ハッシュが無い or タイムスタンプが未来の値なら不正
  if (!hash || nowTimestamp < timestamp) {
    return false
  }

  return createDateHash(createJstDayjs(timestamp), secret) === hash
}
