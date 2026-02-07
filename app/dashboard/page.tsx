'use client'

import { useAuth } from '@/hooks/use-auth'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/dashboard/admin-dashboard'
import SyndicDashboard from '@/components/dashboard/syndic-dashboard'
import UtilisateurDashboard from '@/components/dashboard/utilisateur-dashboard'

export default function DashboardPage() {
  const { user, loading } = useAuth()

  if (loading) return null

  if (!user) {
    redirect('/login')
  }

  if (user.role === 'admin') {
    return <AdminDashboard />
  }

  if (user.role === 'syndic') {
    return <SyndicDashboard />
  }

  return <UtilisateurDashboard />
}
