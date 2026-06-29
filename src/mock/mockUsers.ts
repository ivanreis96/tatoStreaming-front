import type { UserProfile } from '@/entities/user'

export const mockUsers: UserProfile[] = [
  {
    id: 'user-1',
    displayName: 'Ivan Reis',
    email: 'ivan@tato.com',
    avatarUrl: undefined,
  },
  {
    id: 'user-2',
    displayName: 'Ana Lima',
    email: 'ana@tato.com',
    avatarUrl: undefined,
  },
]

/** Usuário simulado como logado durante o desenvolvimento com mock */
export const mockCurrentUser: UserProfile = mockUsers[0]
