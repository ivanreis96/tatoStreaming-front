import { AppImage } from '@/components/ui/image'
import SearchIcon from '../../../assets/search.svg?react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../../../components/ui/input-group'

type SearchMovieInputProps = {
  value: string
  onChange: (value: string) => void
}

export function SearchMovieInput({ value, onChange }: SearchMovieInputProps) {
  return (
    <div className="w-full max-w-xl">
      <InputGroup>
        <InputGroupInput
          type="text"
          placeholder="Buscar filme pelo titulo"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label="Buscar filme por titulo"
        />
        <InputGroupAddon align="inline-end">
          <AppImage src={SearchIcon} alt="Pesquisa" fillColor="var(--muted)" width={24} />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}