import type { CreateMediaDto, Media, MediaIdParamDto, UpdateMediaDto } from '../../../../../shared/dist/index.js'
import { httpClient } from './httpClient'

function authHeaders(accessToken: string) {
  return {
    Authorization: `Bearer ${accessToken}`,
  }
}

export function listMedia() {
  return httpClient<Media[]>('/api/media', {
    method: 'GET',
  })
}

export function getMediaById(params: MediaIdParamDto) {
  return httpClient<Media>(`/api/media/${params.id}`, {
    method: 'GET',
  })
}

export function createMedia(data: CreateMediaDto, accessToken: string) {
  return httpClient<Media>('/api/media', {
    method: 'POST',
    headers: authHeaders(accessToken),
    body: data,
  })
}

export function updateMedia(params: MediaIdParamDto, data: UpdateMediaDto, accessToken: string) {
  return httpClient<Media>(`/api/media/${params.id}`, {
    method: 'PATCH',
    headers: authHeaders(accessToken),
    body: data,
  })
}

export function deleteMedia(params: MediaIdParamDto, accessToken: string) {
  return httpClient<{ message: string }>(`/api/media/${params.id}`, {
    method: 'DELETE',
    headers: authHeaders(accessToken),
  })
}
