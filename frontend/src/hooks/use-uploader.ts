import { toast } from '@components/ui/toast'
import { getPresignedURL } from '@http/get-presigned-url'
import { uploadFile } from '@http/upload-file'
import { useState, useTransition } from 'react'
import { useDropzone } from 'react-dropzone'

const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * 1024
const FIVE_MEGABYTE = 5 * MEGABYTE

export interface IUpload {
  file: File
  progress: number
}

export function useUploader() {
  const [isLoading, startTransition] = useTransition()

  const [uploads, setUploads] = useState<IUpload[]>([])

  const dropzone = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploads((prevUploads) => [
        ...prevUploads,
        ...acceptedFiles.map((file) => ({
          file,
          progress: 0,
        })),
      ])
    },
    maxSize: FIVE_MEGABYTE,
    accept: {
      'image/png': [],
      'image/jpg': [],
      'image/jpeg': [],
    },
    getErrorMessage: (error) =>
      toast.add({
        title: 'Erro!',
        description: error.message,
        type: 'error',
      }),
  })

  function handleRemoveUpload(removingIndex: number) {
    setUploads((currentUploads) =>
      currentUploads.filter(
        (_, currentIndex) => currentIndex !== removingIndex,
      ),
    )

    toast.add({
      title: 'Arquivo removido com sucesso!',
      type: 'success',
    })
  }

  function handleUpload() {
    startTransition(async () => {
      const uploadObjects = await Promise.all(
        uploads.map(async (upload) => ({
          url: await getPresignedURL(upload.file),
          upload,
        })),
      )

      const response = await Promise.allSettled(
        uploadObjects.map(({ url, upload: { file } }, index) =>
          uploadFile({
            url,
            file,
            onProgress: (progress: number) => {
              setUploads((prevUploads) => {
                const nextUploads = [...prevUploads]

                nextUploads[index].progress = progress

                return nextUploads
              })
            },
          }),
        ),
      )

      response.forEach(({ status }, index) => {
        const file = uploads[index].file

        toast.add({
          title:
            status === 'fulfilled' ? 'Arquivo enviado com sucesso!' : 'Erro!',
          description:
            status === 'fulfilled'
              ? `O upload do arquivo ${file.name} foi realizado com sucesso!`
              : `O upload do arquivo ${file.name} falhou.`,
          type: status === 'fulfilled' ? 'success' : 'error',
        })
      })

      setUploads([])
    })
  }

  return {
    files: uploads,
    handleRemoveUpload,
    handleUpload,
    isLoading,
    ...dropzone,
  }
}
