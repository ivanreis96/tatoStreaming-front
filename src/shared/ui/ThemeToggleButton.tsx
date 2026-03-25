type ThemeToggleButtonProps = {
  onToggle?: () => void
}

export function ThemeToggleButton({
  onToggle
}: ThemeToggleButtonProps) {
  return (
    <button type="button" className="theme-toggle-button" onClick={onToggle}></button>
  )
}
