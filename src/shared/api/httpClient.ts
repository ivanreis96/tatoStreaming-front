import { env } from '../config/env'

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
}

async function extractErrorMessage(response: Response) {
  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    const payload = await response.json() as { message?: string | string[] }

    if (Array.isArray(payload.message)) {
      return payload.message.join(' ')
    }

    if (typeof payload.message === 'string' && payload.message.trim().length > 0) {
      return payload.message
    }
  }

  const text = await response.text()

  if (text.trim().length > 0) {
    return text
  }

  if (response.status === 401) {
    return 'Sessão expirada ou inválida. Faça login novamente.'
  }

  if (response.status === 403) {
    return 'Você não tem permissão para realizar esta ação.'
  }

  if (response.status === 404) {
    return 'O recurso solicitado não foi encontrado.'
  }

  return `Erro ${response.status} ao processar a solicitação.`
}

export async function httpClient<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, headers, ...rest } = options

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response))
  }

  return response.json() as Promise<T>
}
