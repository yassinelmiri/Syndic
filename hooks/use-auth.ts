'use client';

import { useEffect, useState } from 'react'
import {
  User,
  AuthState,
  getStoredAuth,
  setStoredAuth,
  clearStoredAuth,
  login as authLogin,
  logout as authLogout,
  initializeUsers,
} from '@/lib/auth'

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeUsers()
    const storedAuth = getStoredAuth()
    if (storedAuth) {
      setAuth(storedAuth)
    }
    setLoading(false)
  }, [])

  const login = (email: string, password: string) => {
    const user = authLogin(email, password)
    if (user) {
      const newAuth: AuthState = {
        user,
        isAuthenticated: true,
      }
      setAuth(newAuth)
      return true
    }
    return false
  }

  const logout = () => {
    authLogout()
    setAuth({
      user: null,
      isAuthenticated: false,
    })
  }

  const updateUser = (updatedUser: User) => {
    const newAuth: AuthState = {
      user: updatedUser,
      isAuthenticated: true,
    }
    setAuth(newAuth)
    setStoredAuth(newAuth)
  }

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
  }
}
