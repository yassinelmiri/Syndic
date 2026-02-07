'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getPayments, getComplaints } from '@/lib/data'
import UserManagement from '@/components/admin/user-management'
import SyndicOversight from '@/components/admin/syndic-oversight'
import FinancialDashboard from '@/components/admin/financial-dashboard'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'syndic' | 'utilisateur'
  apartment?: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [users, setUsers] = useState<User[]>([])
  const complaints = getComplaints()
  const payments = getPayments()

  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }
  }, [])

  const totalUsers = users.filter((u) => u.role !== 'admin').length
  const syndicCount = users.filter((u) => u.role === 'syndic').length
  const utilisateurCount = users.filter((u) => u.role === 'utilisateur').length
  const openComplaints = complaints.filter((c) => c.status === 'open').length
  const totalRevenue = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0)
  const pendingRevenue = payments
    .filter((p) => p.status === 'pending' || p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Tableau de bord Administrateur
        </h2>
        <p className="text-gray-600">
          Vue d'ensemble complète du système de gestion
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Total utilisateurs</div>
          <div className="text-3xl font-bold text-gray-900">{totalUsers}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Gestionnaires</div>
          <div className="text-3xl font-bold text-blue-600">{syndicCount}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Résidents</div>
          <div className="text-3xl font-bold text-green-600">
            {utilisateurCount}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Réclamations ouvertes</div>
          <div className="text-3xl font-bold text-orange-600">
            {openComplaints}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Revenus collectés</div>
          <div className="text-3xl font-bold text-green-600">{totalRevenue}Dhs</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">En attente de paiement</div>
          <div className="text-3xl font-bold text-red-600">
            {pendingRevenue}Dhs
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="financial">Finances</TabsTrigger>
          <TabsTrigger value="syndic-oversight">Supervision</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* User Statistics */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Statistiques utilisateurs
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Administrateurs
                    </p>
                    <p className="text-xs text-gray-600">Accès complet</p>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {users.filter((u) => u.role === 'admin').length}
                  </span>
                </div>
                <hr />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Gestionnaires
                    </p>
                    <p className="text-xs text-gray-600">Gestion building</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    {syndicCount}
                  </span>
                </div>
                <hr />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Résidents
                    </p>
                    <p className="text-xs text-gray-600">Accès utilisateur</p>
                  </div>
                  <span className="text-2xl font-bold text-green-600">
                    {utilisateurCount}
                  </span>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Activité système
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>
                    {openComplaints} réclamation
                    {openComplaints !== 1 ? 's' : ''} ouvert
                    {openComplaints !== 1 ? 'es' : ''}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>
                    {payments.filter((p) => p.status === 'overdue').length}{' '}
                    paiement(s) en retard
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{payments.filter((p) => p.status === 'paid').length} paiements effectués</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="financial">
          <FinancialDashboard />
        </TabsContent>

        <TabsContent value="syndic-oversight">
          <SyndicOversight />
        </TabsContent>
      </Tabs>
    </div>
  )
}
