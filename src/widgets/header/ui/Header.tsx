import { Button } from '../../../components/ui/button'
import { AppImage } from '../../../components/ui/image'
import { ThemeToggleButton } from '../../../shared/ui/ThemeToggleButton'
import LogoIcon from "@/assets/logo.svg?react"

type HeaderProps = {
  onThemeToggle?: () => void,
  darkMode?: boolean,
  isLoged: boolean,
  
}

export function Header({ onThemeToggle, darkMode = true, isLoged }: HeaderProps) {
  const txtButtonAction = isLoged ? "Login" : "Logout"

  return (
    <header className="app-header">
      <div className="app-header__brand">
        <AppImage
          src={LogoIcon}
          alt="Logo Tato Streaming"
          className="app-header__logo"
          keepOriginalSize
          fillColor={darkMode ? "#fff" : "#000"}
        />
      </div>
      <div className="app-header__actions">
        <ThemeToggleButton onToggle={onThemeToggle} darkMode={darkMode} />
        <Button
          size={'lg'}
          variant={"default"}
          onClick={() => {
            console.log("clicou")
          }}
        >
          {txtButtonAction}
        </Button>
      </div>
    </header>
  )
}