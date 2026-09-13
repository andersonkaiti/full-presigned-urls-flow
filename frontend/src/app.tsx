import { Button } from '@components/ui/button'
import { useUploader } from '@hooks/use-uploader'
import { cn } from 'cn'
import { PackageOpenIcon, Trash2Icon } from 'lucide-react'

export function App() {
  const { getRootProps, getInputProps, isDragActive, files, handleRemoveFile } =
    useUploader()

  return (
    <div className="flex min-h-screen justify-center px-5 py-20">
      <div className="w-full max-w-xl">
        <div
          {...getRootProps()}
          className={cn(
            'flex h-60 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed transition-colors hover:bg-accent/50',
            isDragActive && 'bg-accent',
          )}
        >
          <input {...getInputProps()} />

          <PackageOpenIcon className="mb-2 size-10 stroke-1" />

          <span>Solte os seus arquivos aqui.</span>
          <small className="text-muted-foreground text-sm">
            Apenas arquivos PNG de até 1 MB.
          </small>
        </div>

        {files.length > 0 && (
          <div className="mt-10">
            <h2 className="font-medium text-lg tracking-tight">
              Arquivos selecionados.
            </h2>

            <div className="mt-4 space-y-2">
              {files.map((file: File, index: number) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <span className="text-sm">{file.name}</span>

                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button className="mt-4 w-full">Upload</Button>
          </div>
        )}
      </div>
    </div>
  )
}
