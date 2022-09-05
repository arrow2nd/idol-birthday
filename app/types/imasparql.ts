type Value = {
  value: string
}

export type Binding = {
  name: Value
  birthdate: Value
  brand: Value
  color?: Value
}

export type ImasparqlResponse = {
  results: {
    bindings: Binding[]
  }
}
