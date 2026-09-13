import axios from 'axios'

interface IUploadFile {
  url: string
  file: File
}

export async function uploadFile({ url, file }: IUploadFile) {
  await axios.put(url, file, {
    headers: {
      'Content-Type': file.type,
    },
  })
}
