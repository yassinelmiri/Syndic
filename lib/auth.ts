export type UserRole = 'admin' | 'syndic' | 'utilisateur'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  apartment?: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

const STORAGE_KEY = 'syndic_auth'
const USERS_KEY = 'syndic_users'

// Default test users
const defaultUsers: User[] = [
  {
    id: '1',
    email: 'admin@syndic.fr',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'syndic@syndic.fr',
    name: 'Syndic Manager',
    role: 'syndic',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'user@syndic.fr',
    name: 'Jean Dupont',
    role: 'utilisateur',
    apartment: 'Apt 101',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    email: 'user2@syndic.fr',
    name: 'Marie Martin',
    role: 'utilisateur',
    apartment: 'Apt 202',
    createdAt: new Date().toISOString(),
  },
]

export function initializeUsers() {
  if (typeof window === 'undefined') return

  const existingUsers = localStorage.getItem(USERS_KEY)
  if (!existingUsers) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))
  }
}

export function getStoredAuth(): AuthState | null {
  if (typeof window === 'undefined') return null

  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : null
}

export function setStoredAuth(state: AuthState) {
  if (typeof window === 'undefined') return

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function clearStoredAuth() {
  if (typeof window === 'undefined') return

  localStorage.removeItem(STORAGE_KEY)
}

export function login(email: string, password: string): User | null {
  if (typeof window === 'undefined') return null

  initializeUsers()

  // Simple authentication for demo - accept any email:password combination
  // In production, this would hash passwords and verify against a backend
  const usersStr = localStorage.getItem(USERS_KEY)
  const users = usersStr ? JSON.parse(usersStr) : defaultUsers

  const user = users.find((u: User) => u.email === email)
  if (user) {
    const authState: AuthState = {
      user,
      isAuthenticated: true,
    }
    setStoredAuth(authState)
    return user
  }

  return null
}

export function logout() {
  if (typeof window === 'undefined') return

  clearStoredAuth()
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null

  const auth = getStoredAuth()
  return auth?.user || null
}

export function getAllUsers(): User[] {
  if (typeof window === 'undefined') return []

  initializeUsers()
  const usersStr = localStorage.getItem(USERS_KEY)
  return usersStr ? JSON.parse(usersStr) : defaultUsers
}
