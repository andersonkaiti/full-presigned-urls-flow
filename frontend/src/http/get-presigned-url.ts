import { httpClient } from './http-client'

interface IGetPresignedURLRequest extends File {}

interface IGetPresignedURLResponse {
  presignedUrl: string
}

export async function getPresignedURL({ name }: IGetPresignedURLRequest) {
  const { data } = await httpClient.post<IGetPresignedURLResponse>('/', {
    filename: name,
  })

  return data.presignedUrl
}
