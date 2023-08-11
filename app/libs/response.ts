/**
 * 404 Not Found
 * @param statusText ステータスメッセージ
 * @returns レスポンス
 */
export function responseNotFound(statusText: string): Response {
  return new Response(null, {
    status: 404,
    statusText
  })
}

/**
 * 400 Bad Request
 * @param statusText ステータスメッセージ
 * @returns レスポンス
 */
export function responseBadRequest(statusText: string): Response {
  return new Response(null, {
    status: 400,
    statusText
  })
}

/**
 * 500 Internal Server Error
 * @returns レスポンス
 */
export function responseServerError(): Response {
  return new Response(null, {
    status: 500,
    statusText: "現在、im@sparqlにアクセスできません"
  })
}
