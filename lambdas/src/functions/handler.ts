import { response } from '@utils/response.ts'
import type { APIGatewayProxyEventV2 } from 'aws-lambda'

export async function hello(_event: APIGatewayProxyEventV2) {
  return response({
    statusCode: 200,
    body: {
      message: 'Hello, World!',
    },
  })
}
