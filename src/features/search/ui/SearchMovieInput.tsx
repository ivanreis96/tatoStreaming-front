import { Input } from '../../../components/ui/input'

type SearchMovieInputProps = {
  value: string
  onChange: (value: string) => void
}

export function SearchMovieInput({ value, onChange }: SearchMovieInputProps) {
  return (
    <div className="w-full max-w-xl">
      <Input
        type="text"
        placeholder="Buscar filme pelo titulo"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Buscar filme por titulo"
      />
    </div>
  )
}