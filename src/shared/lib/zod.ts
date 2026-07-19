import type { ZodError } from 'zod'

export function getFirstZodError(error: ZodError, fallbackMessage: string) {
  const issue = error.issues[0]

  if (!issue) {
    return fallbackMessage
  }

  return issue.message
}