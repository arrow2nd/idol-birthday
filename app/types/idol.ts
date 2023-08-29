export type Color = {
  hex: string
  isWhitish: boolean
}

export type Birth = {
  month: number
  date: number
}

export type Idol = {
  id: string
  name: string
  brand: string
  birth: Birth
  birthday: string
  color: Color
  idolListUrl?: string
}
