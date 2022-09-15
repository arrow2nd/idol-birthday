export type Color = {
  hex: string
  isWhitish: boolean
}

export type Birth = {
  month: number
  day: number
}

export type Idol = {
  id: string
  name: string
  brand: string
  birth: Birth
  color: Color
}
