import { Progress as ProgressPrimitive } from '@base-ui/react/progress'
import { cn } from 'cn'
import { motion } from 'motion/react'

function Progress({
  className,
  children,
  value,
  max = 100,
  min = 0,
  ...props
}: ProgressPrimitive.Root.Props) {
  const percentage = value == null ? null : ((value - min) / (max - min)) * 100

  return (
    <ProgressPrimitive.Root
      value={value}
      max={max}
      min={min}
      data-slot="progress"
      className={cn('flex flex-wrap gap-3', className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator percentage={percentage} />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        'relative flex h-1.5 w-full items-center overflow-x-hidden rounded-full bg-muted',
        className,
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  percentage,
  ...props
}: ProgressPrimitive.Indicator.Props & { percentage?: number | null }) {
  const isIndeterminate = percentage == null

  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      render={
        <motion.div
          initial={false}
          animate={{ width: isIndeterminate ? '100%' : `${percentage}%` }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      }
      className={cn(
        'h-full origin-left rounded-full bg-primary',
        isIndeterminate && 'animate-pulse',
        className,
      )}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn('font-medium text-sm', className)}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        'ml-auto text-muted-foreground text-sm tabular-nums',
        className,
      )}
      data-slot="progress-value"
      {...props}
    />
  )
}

export {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
}
