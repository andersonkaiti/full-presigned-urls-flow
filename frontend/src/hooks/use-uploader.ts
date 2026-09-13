import { getPresignedURL } from '@http/get-presigned-url'
import { uploadFile } from '@http/upload-file'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

const ONE_MB = 1024 * 1024

export function useUploader() {
  const [files, setFiles] = useState<File[]>([])

  const dropzone = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
    },
    maxSize: ONE_MB,
    accept: {
      'image/png': [],
    },
  })

  function handleRemoveFile(removingIndex: number) {
    setFiles((prevFiles) => {
      const newState = [...prevFiles]
      newState.splice(removingIndex, 1)
      return newState
    })
  }

  async function handleUpload() {
    const urls = await Promise.all(
      files.map(async (file) => ({
        url: await getPresignedURL(file),
        file,
      })),
    )

    const response = await Promise.allSettled(urls.map(uploadFile))

    response.forEach((response, index) => {
      if (response.status === 'rejected') {
        const fileWithError = files[index]

        console.log(`O upload do arquivo ${fileWithError.name} falhou.`)
      }
    })
  }

  return {
    files,
    handleRemoveFile,
    handleUpload,
    ...dropzone,
  }
}
