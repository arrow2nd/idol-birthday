import axios from 'axios'

import { Idol } from '~/types/idol'
import { ImasparqlResponse } from '~/types/imasparql'

import { getBrandColor, isWhitishColor } from './color'

const query = (id: string) =>
  `
PREFIX schema: <http://schema.org/>
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?name ?birthdate ?brand ?color
WHERE {
  ?d rdfs:label ?name;
     schema:birthDate ?birthdate;
     imas:Brand ?brand.
  OPTIONAL { ?d imas:Color ?color. }
  FILTER(CONTAINS(LCASE(STR(?d)), "detail/${id}"))
}
`.replace(/[\n\r\s]+/g, ' ')

/**
 * im@sparqlからアイドルのデータを取得
 * @param id リソースID
 * @returns レスポンス
 */
export async function fetchIdolData(id: string): Promise<Idol> {
  const url = new URL('https://sparql.crssnky.xyz/spql/imas/query')
  url.searchParams.append('output', 'json')
  url.searchParams.append('query', query(id))

  try {
    // 5秒でタイムアウト
    const res = await axios.get<ImasparqlResponse>(url.toString(), {
      timeout: 5000
    })

    if (res.data.results.bindings.length <= 0) {
      throw new Error('データがありません')
    }

    const { name, brand, birthdate, color } = res.data.results.bindings[0]
    const birth = birthdate.value.match(/--(?<month>\d+)-(?<day>\d+)/)!
    const colorHex = color?.value ?? getBrandColor(brand.value)

    return {
      id: id,
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
  } catch (err) {
    throw err
  }
}
