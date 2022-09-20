import md5 from 'crypto-js/md5'
import { Dayjs } from 'dayjs'

import { createJstDayjs } from './date'

/**
 * 日付のハッシュ値を作成
 * @param date Dayjsオブジェクト
 * @param secret シークレット
 * @returns ハッシュ値（MD5）
 */
export function createDateHash(date: Dayjs, secret: string): string {
  const fullDate = date.format('YYYYMD')

  // NOTE: `node:crypto` を import しようとすると
  // No matching export in "node-modules-polyfills:crypto" for import "createHash"
  // になるので、これが修正されるまで crypto-js で代替してる
  //
  // LINK: https://github.com/remix-run/remix/issues/3120

  return md5(fullDate + secret).toString()
}

export type VerificationArgs = {
  hash: string
  timestamp: number
  secret: string
}

/**
 * 日付のハッシュ値を検証
 * @param .hash ハッシュ値
 * @param .timestamp タイムスタンプ
 * @param .secret シークレット
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
