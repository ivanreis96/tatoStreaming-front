export function parseDateOnly(value: string): Date {
  if (value.includes('/')) {
    const [day, month, year] = value.split('/').map(Number)
    return new Date(year, month - 1, day)
  }

  const [year, month, day] = value.split('T')[0].split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function formatDateOnlyToIso(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}