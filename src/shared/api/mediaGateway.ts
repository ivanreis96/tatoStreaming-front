import type { CreateMediaDto, Media } from '../../../../../shared/dist/index.js'
import { mockMovies } from '@/mock/mockMovies'
import { env } from '../config/env'
import * as mediaApi from './mediaApi'

type MediaSource = 'api' | 'mock'

type ListMediaResult = {
  movies: Media[]
  source: MediaSource
}

type CreateMediaInput = {
  payload: CreateMediaDto
  accessToken: string
  createdBy: string
}

type CreateMediaResult = {
  movie: Media
  source: MediaSource
}

let mockMediaStore: Media[] = [...mockMovies]

function cloneMockStore() {
  return [...mockMediaStore]
}

function generateMockId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `mock-media-${Date.now()}`
}

function createMockMovie(payload: CreateMediaDto, createdBy: string): Media {
  return {
    id: generateMockId(),
    createdBy,
    ...payload,
  }
}

export async function listMediaWithFallback(): Promise<ListMediaResult> {
  if (env.useMockMedia) {
    return {
      movies: cloneMockStore(),
      source: 'mock',
    }
  }

  try {
    const movies = await mediaApi.listMedia()

    return {
      movies,
      source: 'api',
    }
  } catch (error) {
    if (!env.useMockMediaFallback) {
      throw error
    }

    return {
      movies: cloneMockStore(),
      source: 'mock',
    }
  }
}

export async function createMediaWithFallback(input: CreateMediaInput): Promise<CreateMediaResult> {
  if (env.useMockMedia) {
    const movie = createMockMovie(input.payload, input.createdBy)
    mockMediaStore = [movie, ...mockMediaStore]

    return {
      movie,
      source: 'mock',
    }
  }

  const movie = await mediaApi.createMedia(input.payload, input.accessToken)

  return {
    movie,
    source: 'api',
  }
}
