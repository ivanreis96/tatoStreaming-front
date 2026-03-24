import { ThemeToggleButton } from '../../../shared/ui/ThemeToggleButton'

type HeaderProps = {
  onThemeToggle?: () => void
  themeToggleLabel?: string
}

export function Header({ onThemeToggle, themeToggleLabel }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__brand">Tato Streaming</div>
      <div className="app-header__actions">
        <span className="app-header__badge">front only</span>
        <ThemeToggleButton onToggle={onThemeToggle} label={themeToggleLabel} />
      </div>
    </header>
  )
}
