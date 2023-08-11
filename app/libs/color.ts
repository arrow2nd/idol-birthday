/** ブランドカラーのリスト */
export const brandColors = new Map([
  ["1stVision", "F34F6D"],
  ["765AS", "F34F6D"],
  ["DearlyStars", "FF74B8"],
  ["MillionLive", "FFC30B"],
  ["SideM", "0FBE94"],
  ["CinderellaGirls", "2681C8"],
  ["ShinyColors", "8dBBFF"],
  ["Other", "FF74B8"]
])

/**
 * ブランドのイメージカラーを取得
 * @param brand ブランド名
 * @returns 16進数カラーコード
 */
export function getBrandColor(brand: string): string {
  return brandColors.get(brand) ?? "FF74B8"
}

/**
 * 白っぽい色かどうか
 * @param color 16進数カラーコード
 * @return 結果
 */
export function isWhitishColor(color: string): boolean {
  const hex = color.match(/[0-9A-Fa-f]{2}/g)
  if (!hex) return false

  const [r, g, b] = hex.map((v) => parseInt(v, 16))

  // グレースケール
  const gs = Math.floor((r * 0.299 + g * 0.587 + b * 0.114) / 2.55)

  return gs > 65
}
