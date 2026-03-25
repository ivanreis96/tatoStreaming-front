import { ThemeToggleButton } from '../../../shared/ui/ThemeToggleButton'

type HeaderProps = {
  onThemeToggle?: () => void
}

export function Header({ onThemeToggle }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        
      </div>
      <div className="app-header__actions">
        <ThemeToggleButton onToggle={onThemeToggle} />
      </div>
    </header>
  )
}
