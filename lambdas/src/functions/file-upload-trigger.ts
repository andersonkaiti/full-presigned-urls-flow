import { UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { dynamoClient } from '@clients/dynamodb.client.ts'
import { env } from '@config/env.ts'
import type { S3CreateEvent } from 'aws-lambda'

export async function handler(event: S3CreateEvent) {
  const commands = event.Records.map(
    ({ s3 }) =>
      new UpdateCommand({
        TableName: env.TABLE_NAME,
        Key: {
          fileKey: decodeURIComponent(s3.object.key),
        },
        UpdateExpression: 'SET #status = :status',
        ExpressionAttributeNames: {
          '#status': 'status',
        },
        ExpressionAttributeValues: {
          ':status': 'UPLOADED',
        },
      }),
  )

  await Promise.all(commands.map((command) => dynamoClient.send(command)))
}
