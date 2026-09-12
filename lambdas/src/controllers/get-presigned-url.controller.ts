import { randomUUID } from 'node:crypto'
import path from 'node:path'
import type { IRequest } from '@app-types/http.ts'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3Client } from '@clients/s3.client.ts'
import { env } from '@config/env.ts'
import { response } from '@utils/response.ts'
import { z } from 'zod'

const getPresignedUrlSchema = z.object({
  filename: z
    .string()
    .refine(
      (value) => path.extname(value).length > 0,
      'The filename must have an extension',
    ),
})

export class GetPresignedUrlController {
  static async execute({ body }: IRequest) {
    const { success, error, data } = getPresignedUrlSchema.safeParse(body)

    if (!success) {
      return response({
        statusCode: 400,
        body: {
          error: z.treeifyError(error),
        },
      })
    }

    const { filename } = data

    const s3Command = new PutObjectCommand({
      Bucket: env.BUCKET_NAME,
      Key: `${randomUUID()}-${filename}`,
    })

    const ONE_MINUTE = 60
    const ONE_HOUR = 60 * ONE_MINUTE

    const presignedUrl = await getSignedUrl(s3Client, s3Command, {
      expiresIn: ONE_HOUR,
    })

    return response({
      statusCode: 200,
      body: {
        presignedUrl,
      },
    })
  }
}
