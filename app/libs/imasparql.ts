import axios from 'axios'

import { Idol } from '~/types/idol'
import { ImasparqlResponse } from '~/types/imasparql'

import { getBrandColor, isWhitishColor } from './color'
import { createBirthDateRangeRegex } from './date'

/** 共通部分 */
const commonQuery = (q: string) => `
PREFIX schema: <http://schema.org/>
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?d ?name ?birthdate ?brand ?color
WHERE {
  ?d rdfs:label ?name;
     schema:birthDate ?birthdate;
     imas:Brand ?brand.
  OPTIONAL { ?d imas:Color ?color. }
  ${q}
}
ORDER BY ?birthdate
LIMIT 10
`

/**
 * アイドルIDから検索するクエリを作成
 * @param id アイドルID
 * @returns SPARQLクエリ
 */
export const createQuery2SearchById = (id: string) =>
  commonQuery(`FILTER(REGEX(LCASE(STR(?d)), "detail/${id}$", "i"))`)

/**
 * 近日誕生日のアイドルを検索するクエリを作成
 * @returns SPARQLクエリ
 */
export const createQuery2RecentBirthday = () =>
  commonQuery(`FILTER(REGEX(STR(?birthdate),"${createBirthDateRangeRegex()}"))`)

/**
 * im@sparqlからデータを取得
 * @param query SPARQLクエリ
 * @returns レスポンス
 */
export async function fetchFromImasparql(
  query: string
): Promise<Idol[] | null> {
  const url = new URL('https://sparql.crssnky.xyz/spql/imas/query')
  url.searchParams.append('output', 'json')
  url.searchParams.append('query', query.replace(/[\n\r\s]/g, ' '))

  // 5秒でタイムアウト
  const { data } = await axios
    .get<ImasparqlResponse>(url.toString(), {
      timeout: 5000
    })
    .catch((err) => {
      console.error(err)
      throw err
    })

  // データがない
  if (data.results.bindings.length <= 0) {
    return null
  }

  return data.results.bindings.map(
    ({ d, name, birthdate, brand, color }): Idol => {
      const id = d.value.match(/detail\/(.+)$/)?.[1]

      if (!id) {
        throw new Error(`Failed to extract ID (${d.value})`)
      }

      const birth = birthdate.value.match(/--(?<month>\d+)-(?<day>\d+)/)!
      const colorHex = color?.value ?? getBrandColor(brand.value)

      return {
        id: id.toLowerCase(),
        name: name.value,
        brand: brand.value,
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
  )
}
