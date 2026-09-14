import { z } from 'zod'

const envSchema = z.object({
  BUCKET_NAME: z.string(),
  TABLE_NAME: z.string(),
})

export const env = envSchema.parse(process.env)
