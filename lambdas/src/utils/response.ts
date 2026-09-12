import type { IResponse } from '@app-types/http.ts'

export function response({ statusCode, headers, body }: IResponse) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  }
}
