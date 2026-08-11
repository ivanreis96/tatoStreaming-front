/// <reference types="jest" />

import { mockMovies } from '@/mock/mockMovies'

type GatewayEnv = {
  useMockMedia: boolean
  useMockMediaFallback: boolean
}

async function loadGatewayForTest(envConfig: GatewayEnv) {
  jest.resetModules()

  const listMediaMock = jest.fn()

  jest.doMock('../config/env', () => ({
    env: {
      apiBaseUrl: 'http://localhost:3000',
      useMockMedia: envConfig.useMockMedia,
      useMockMediaFallback: envConfig.useMockMediaFallback,
    },
  }))

  jest.doMock('./mediaApi', () => ({
    listMedia: listMediaMock,
    createMedia: jest.fn(),
  }))

  const gateway = await import('./mediaGateway')

  return {
    gateway,
    listMediaMock,
  }
}

describe('listMediaWithFallback', () => {
  it('retorna source api quando API responde com sucesso', async () => {
    const apiMovies = [
      {
        ...mockMovies[0],
        id: 'api-1',
        titulo: 'Filme da API',
      },
    ]

    const { gateway, listMediaMock } = await loadGatewayForTest({
      useMockMedia: false,
      useMockMediaFallback: true,
    })

    listMediaMock.mockResolvedValue(apiMovies)

    const result = await gateway.listMediaWithFallback()

    expect(listMediaMock).toHaveBeenCalledTimes(1)
    expect(result.source).toBe('api')
    expect(result.movies).toEqual(apiMovies)
  })

  it('retorna source mock quando API falha e fallback esta ativo', async () => {
    const { gateway, listMediaMock } = await loadGatewayForTest({
      useMockMedia: false,
      useMockMediaFallback: true,
    })

    listMediaMock.mockRejectedValue(new Error('API indisponivel'))

    const result = await gateway.listMediaWithFallback()

    expect(listMediaMock).toHaveBeenCalledTimes(1)
    expect(result.source).toBe('mock')
    expect(result.movies).toEqual(mockMovies)
  })

  it('relanca erro quando API falha e fallback esta desativado', async () => {
    const { gateway, listMediaMock } = await loadGatewayForTest({
      useMockMedia: false,
      useMockMediaFallback: false,
    })

    const apiError = new Error('falha sem fallback')
    listMediaMock.mockRejectedValue(apiError)

    await expect(gateway.listMediaWithFallback()).rejects.toThrow('falha sem fallback')
    expect(listMediaMock).toHaveBeenCalledTimes(1)
  })
})
