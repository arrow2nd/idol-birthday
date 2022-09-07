export type Idol = {
  id: string
  name: string
  brand: string
  birth: {
    month: number
    day: number
  }
  color: {
    hex: string
    isWhitish: boolean
  }
}
