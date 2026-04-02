import { Button } from "../../components/ui/button"
import { AppImage } from "../../components/ui/image"
import SunIcon from "../../assets/sun.svg?react"
import MoonIcon from "../../assets/moon.svg?react"

type ThemeToggleButtonProps = {
  onToggle?: () => void,
  darkMode?: boolean,
}

export function ThemeToggleButton({
  onToggle,
  darkMode = true,
}: ThemeToggleButtonProps) {
  return (
    <Button variant={"secondary"} onClick={onToggle}
    >
      <AppImage
        alt={darkMode ?
          "Ícone de sol para clicar e mudar para o modo claro"
          : "Ícone de lua para clicar e mudar para o modo escuro"}
        src={darkMode ? SunIcon : MoonIcon}
        fillColor={darkMode ?"#ffffff" : "#000"}
      />
    </Button>
  )
}
