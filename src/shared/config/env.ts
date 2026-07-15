function parseBooleanEnv(value: string | undefined, fallback: boolean) {
  if (value === undefined) {
    return fallback
  }

  return /^(1|true|yes|on)$/i.test(value)
}

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
  useMockMedia: parseBooleanEnv(import.meta.env.VITE_USE_MOCK_MEDIA, false),
  useMockMediaFallback: parseBooleanEnv(import.meta.env.VITE_USE_MOCK_MEDIA_FALLBACK, true),
}
