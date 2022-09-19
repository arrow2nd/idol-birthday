import md5 from 'crypto-js/md5'
import { Dayjs } from 'dayjs'

import { createDayjs } from './date'

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

  console.log(fullDate, secret)

  return md5(fullDate + secret).toString()
}

/**
 * 日付のハッシュ値を検証
 * @param hash ハッシュ値
 * @param timestamp タイムスタンプ
 * @param secret シークレット
 * @returns 結果
 */
export function verificationHash(
  hash: string,
  timestamp: number,
  secret: string
): boolean {
  const nowTimestamp = createDayjs().unix()

  // ハッシュが無い or タイムスタンプが未来の値なら不正
  if (!hash || nowTimestamp < timestamp) {
    return false
  }

  return createDateHash(createDayjs(timestamp), secret) === hash
}
