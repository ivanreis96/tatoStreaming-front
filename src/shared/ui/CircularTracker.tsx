type CircularTrackerProps = {
  value: number
  size?: number
  strokeWidth?: number
  trackColor?: string
  progressColor?: string
  textColor?: string
  className?: string
  showPercentage?: boolean
  label?: string
}

export function CircularTracker({
  value,
  size = 120,
  strokeWidth = 10,
  trackColor = 'rgba(255, 255, 255, 0.2)',
  progressColor = '#F5A623',
  textColor,
  className,
  showPercentage = true,
  label = 'Progresso',
}: CircularTrackerProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100)
  const resolvedTextColor = textColor ?? progressColor

  const radius = (size - strokeWidth) / 2
  const center = size / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-card/75 ${className ?? ''}`}
      style={{ width: size, height: size, position: 'relative' }}
      role="img"
      aria-label={`${label}: ${Math.round(clampedValue)}%`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 220ms ease-in-out' }}
        />
      </svg>

      {showPercentage ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: resolvedTextColor,
            fontWeight: 700,
            lineHeight: 1,
            backgroundColor: 'transparent',
          }}
        >
          <span style={{ fontSize: `${Math.max(16, size * 0.22)}px` }}>
            {Math.round(clampedValue)}
          </span>
          <span style={{ fontSize: `${Math.max(10, size * 0.12)}px`, marginLeft: '1px' }}>
            %
          </span>
        </div>
      ) : null}
    </div>
  )
}