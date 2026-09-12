export interface IRequest {
  body: Record<string, unknown>
  params: Record<string, unknown>
}

export interface IResponse {
  statusCode: number
  headers?: Record<string, unknown>
  body?: Record<string, unknown>
}
