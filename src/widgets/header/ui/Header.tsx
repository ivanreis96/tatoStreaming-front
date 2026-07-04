import { Button } from '@/components/ui/button'
import { AppImage, ThemeToggleButton } from '@/shared'
import LogoIcon from "@/assets/logo.svg?react"

type HeaderProps = {
  onThemeToggle?: () => void,
  darkMode?: boolean,
  isLoged: boolean,
  onAuthAction?: () => void,
}

export function Header({ onThemeToggle, darkMode = true, isLoged, onAuthAction }: HeaderProps) {
  const txtButtonAction = isLoged ? 'Logout' : 'Login'

  return (
    <header className="app-header">
      <div className="app-header__brand">
        <AppImage
          src={LogoIcon}
          alt="Logo Tato Streaming"
          className="app-header__logo"
          fillColor={darkMode ? "#fff" : "#000"}
          height={60}
          fullWidth={true}
        />
      </div>
      <div className="app-header__actions">
        <ThemeToggleButton onToggle={onThemeToggle} darkMode={darkMode} />
        <Button
          size={'lg'}
          variant={"default"}
          onClick={onAuthAction}
        >
          {txtButtonAction}
        </Button>
      </div>
    </header>
  )
}