import axios from 'axios'

import { Idol } from '~/types/idol'
import { ImasparqlResponse } from '~/types/imasparql'

import { getBrandColor, isWhitishColor } from './color'

/**
 * アイドルIDから検索するクエリを作成
 * @param id アイドルID
 * @retuy SPARQLクエリ
 */
export const createQuery2SearchById = (id: string) => `
PREFIX schema: <http://schema.org/>
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?name ?birthdate ?brand ?color
WHERE {
  ?d rdfs:label ?name;
     schema:birthDate ?birthdate;
     imas:Brand ?brand.
  OPTIONAL { ?d imas:Color ?color. }
  FILTER(REGEX(LCASE(STR(?d)), "detail/${id}$", "i"))
}
`

/**
 * im@sparqlからデータを取得
 * @param query SPARQLクエリ
 * @returns レスポンス
 */
export async function fetchFromImasparql(query: string): Promise<Idol | null> {
  const url = new URL('https://sparql.crssnky.xyz/spql/imas/query')
  url.searchParams.append('output', 'json')
  url.searchParams.append('query', query.replace(/[\n\r\s]/g, ' '))

  // 5秒でタイムアウト
  const res = await axios
    .get<ImasparqlResponse>(url.toString(), {
      timeout: 5000
    })
    .catch((err) => {
      console.error(err)
      throw err
    })

  // データがない
  if (res.data.results.bindings.length <= 0) {
    return null
  }

  const { name, brand, birthdate, color } = res.data.results.bindings[0]
  const birth = birthdate.value.match(/--(?<month>\d+)-(?<day>\d+)/)!
  const colorHex = color?.value ?? getBrandColor(brand.value)

  return {
    name: name.value,
    birth: {
      month: parseInt(birth.groups!.month),
      day: parseInt(birth.groups!.day)
    },
    color: {
      hex: colorHex,
      isWhitish: isWhitishColor(colorHex)
    }
  }
}
