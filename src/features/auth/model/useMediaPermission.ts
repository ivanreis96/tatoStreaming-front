import { useAppSelector } from '@/app/providers/hooks'
import type { Media } from '@/entities/media'

type MediaPermission = {
  canEdit: boolean
  canDelete: boolean
  canView: boolean
}

export function useMediaPermission(media: Media): MediaPermission {
  const currentUser = useAppSelector((state) => state.auth.currentUser)

  const isOwner = currentUser !== null && currentUser.id === media.createdBy

  return {
    canView: isOwner,
    canEdit: isOwner,
    canDelete: isOwner,
  }
}
