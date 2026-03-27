import { Button } from '../../../components/ui/button'
import { ThemeToggleButton } from '../../../shared/ui/ThemeToggleButton'

type HeaderProps = {
  onThemeToggle?: () => void,
  isLoged: boolean
}

export function Header({ onThemeToggle, isLoged }: HeaderProps) {
  const txtButtonAction =  isLoged ? "Login" : "Logout"

  return (
    <header className="app-header">
      <div className="app-header__brand">
        
      </div>
      <div className="app-header__actions">
        <ThemeToggleButton onToggle={onThemeToggle} />
        <Button
          variant={"default"}
          title={txtButtonAction}
          onClick={() => {
            console.log("clicou")
          }}
        />
      </div>
    </header>
  )
}
