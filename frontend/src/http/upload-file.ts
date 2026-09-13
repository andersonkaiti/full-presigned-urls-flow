import axios from 'axios'

interface IUploadFile {
  url: string
  file: File
  onProgress?: (progress: number) => void
}

export async function uploadFile({ url, file, onProgress }: IUploadFile) {
  await axios.put(url, file, {
    headers: {
      'Content-Type': file.type,
    },
    onUploadProgress: ({ total, loaded }) => {
      const percentage = Math.round((loaded * 100) / Number(total))

      onProgress?.(percentage)
    },
  })
}
