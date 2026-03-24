type ThemeToggleButtonProps = {
  onToggle?: () => void
  label?: string
}

export function ThemeToggleButton({
  onToggle,
  label = 'Alternar tema',
}: ThemeToggleButtonProps) {
  return (
    <button type="button" className="theme-toggle-button" onClick={onToggle}>
      {label}
    </button>
  )
}
