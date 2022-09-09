export type Color = {
  hex: string
  isWhitish: boolean
}

export type Idol = {
  id: string
  name: string
  brand: string
  birth: {
    month: number
    day: number
  }
  color: Color
}
