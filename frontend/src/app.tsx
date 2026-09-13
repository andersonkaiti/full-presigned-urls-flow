import { Button } from '@components/ui/button'
import { type IUpload, useUploader } from '@hooks/use-uploader'
import { cn } from 'cn'
import { PackageOpenIcon, Trash2Icon } from 'lucide-react'
import { Progress } from './components/ui/progress'

export function App() {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    files,
    handleRemoveUpload,
    handleUpload,
    isLoading,
  } = useUploader()

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-20">
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
              {files.map(
                (
                  { file: { name, size }, progress }: IUpload,
                  index: number,
                ) => (
                  <div key={name} className="space-y-3 rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <span className="text-sm">{name}</span>
                        <small className="block text-[10px] text-muted-foreground">
                          {(size / (1024 * 1024)).toFixed(2)} MB
                        </small>
                      </div>

                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveUpload(index)}
                      >
                        <Trash2Icon className="size-4" />
                      </Button>
                    </div>

                    <Progress value={progress} />
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        <Button
          className="mt-4 w-full"
          onClick={handleUpload}
          disabled={files.length <= 0 || isLoading}
          isLoading={isLoading}
        >
          Enviar
        </Button>
      </div>
    </div>
  )
}
