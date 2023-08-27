import axios from "axios"

import { Idol } from "~/types/idol"
import { ImasparqlResponse } from "~/types/imasparql"

import { getBrandColor, isWhitishColor } from "./color"
import { createJstDayjs } from "./date"

/**
 * クエリを作成
 * @param q 埋め込むクエリ
 * @param limit 取得件数を制限するか
 * @returns クエリ
 */
function createQuery(q: string, limit: boolean = false): string {
  return `
  PREFIX schema: <http://schema.org/>
  PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

  SELECT DISTINCT ?d ?name ?birthdate ?brand ?color ?url
  WHERE {
    ?d rdfs:label ?name;
       imas:nameKana | imas:givenNameKana | imas:alternateNameKana ?kana;
       schema:birthDate ?birthdate;
       imas:Brand ?brand.
    OPTIONAL { ?d imas:Color ?color. }
    OPTIONAL { ?d imas:IdolListURL ?url. }
    FILTER(STR(?brand) != '1stVision')
    FILTER(!CONTAINS(STR(?d), 'Akizuki_Ryo_876'))
    ${q}
  }
  ORDER BY ?birthdate
  ${limit ? "LIMIT 10" : ""}
  `
}

/**
 * ダブルクオートをエスケープ
 * @param str 文字列
 * @returns エスケープ後の文字列
 */
function escapeDoubleQuote(str: string): string {
  return str.replace(/"/g, '\\"')
}

/**
 * アイドルIDから検索するクエリを作成
 * @param id アイドルID
 * @returns SPARQLクエリ
 */
export function createQuery2SearchById(id: string): string {
  return createQuery(
    `FILTER(REGEX(LCASE(STR(?d)), "detail/${escapeDoubleQuote(id)}$", "i"))`
  )
}

/**
 * キーワードから検索するクエリを作成
 * @param keyword キーワード
 * @returns SPARQLクエリ
 */
export function createQuery2SearchByKeyword(keyword: string): string {
  const keywordAfterEscape = escapeDoubleQuote(keyword)

  return createQuery(
    `FILTER(CONTAINS(?name, "${keywordAfterEscape}") || CONTAINS(?kana, "${keywordAfterEscape}"))`,
    true
  )
}

/**
 * 直近14日以内が誕生日のアイドルを検索するクエリを作成
 * @returns SPARQLクエリ
 */
export function createQuery2RecentBirthday(): string {
  const dateFormat = "--MM-DD"
  const now = createJstDayjs()
  const nowDate = now.format(dateFormat)
  const oneMonthLaterDate = now.add(14, "day").format(dateFormat)

  return createQuery(`
    bind("${nowDate}"^^xsd:gMonthDay as ?start)
    bind("${oneMonthLaterDate}"^^xsd:gMonthDay as ?end)
    FILTER(?birthdate >= ?start && ?birthdate <= ?end).
  `)
}

/**
 * im@sparqlからデータを取得
 * @param query SPARQLクエリ
 * @returns レスポンス
 */
export async function fetchFromImasparql(query: string): Promise<Idol[]> {
  const url = new URL("https://sparql.crssnky.xyz/spql/imas/query")
  url.searchParams.append("output", "json")
  url.searchParams.append("query", query.replace(/[\n\r\s]/g, " "))

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
    return []
  }

  return data.results.bindings.map(
    ({ d, name, birthdate, brand, color, url }): Idol => {
      const id = d.value.match(/detail\/(.+)$/)?.[1]

      if (!id) {
        throw new Error(`Failed to extract ID (${d.value})`)
      }

      const birth = birthdate.value.match(/--(?<month>\d+)-(?<day>\d+)/)!
      const birthday = birthdate.value.replace(/^--(\d+)-(\d+)$/, "$1/$2")
      const colorHex = color?.value ?? getBrandColor(brand.value)

      return {
        id: id.toLowerCase(),
        name: name.value,
        brand: brand.value,
        birth: {
          month: parseInt(birth.groups!.month),
          date: parseInt(birth.groups!.day)
        },
        birthday,
        color: {
          hex: colorHex,
          isWhitish: isWhitishColor(colorHex)
        },
        idolListUrl: url?.value
      }
    }
  )
}
