type Value = {
  value: string
}

export type Binding = {
  d: Value
  name: Value
  birthdate: Value
  brand: Value
  color?: Value
  url?: Value
}

export type ImasparqlResponse = {
  results: {
    bindings: Binding[]
  }
}
