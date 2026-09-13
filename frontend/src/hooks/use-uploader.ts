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

  return {
    files,
    handleRemoveFile,
    ...dropzone,
  }
}
