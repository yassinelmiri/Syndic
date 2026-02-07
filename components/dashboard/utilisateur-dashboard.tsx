'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getPayments, getComplaints, getAnnouncements } from '@/lib/data'
import { useAuth } from '@/hooks/use-auth'
import ComplaintForm from '@/components/utilisateur/complaint-form'
import MyPayments from '@/components/utilisateur/my-payments'
import MessagesPanel from '@/components/messages/messages-panel'

export default function UtilisateurDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const { user } = useAuth()
  const complaints = getComplaints().filter((c) => c.userId === user?.id)
  const payments = getPayments().filter((p) => p.userId === user?.id)
  const announcements = getAnnouncements()

  const pendingPayments = payments.filter(
    (p) => p.status === 'pending' || p.status === 'overdue'
  )
  const totalDue = pendingPayments.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Bienvenue, {user?.name}
        </h2>
        <p className="text-gray-600">Gestion de votre logement</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Mes réclamations</div>
          <div className="text-3xl font-bold text-gray-900">
            {complaints.length}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Paiements dus</div>
          <div className="text-3xl font-bold text-orange-600">
            {pendingPayments.length}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Montant à payer</div>
          <div className="text-3xl font-bold text-red-600">
            {totalDue}Dhs
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="complaints">Mes réclamations</TabsTrigger>
          <TabsTrigger value="payments">Mes paiements</TabsTrigger>
          <TabsTrigger value="announcements">Annonces</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Recent Complaints */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Mes réclamations
              </h3>
              {complaints.length === 0 ? (
                <p className="text-gray-600">Aucune réclamation</p>
              ) : (
                <div className="space-y-3">
                  {complaints.slice(0, 3).map((complaint) => (
                    <div
                      key={complaint.id}
                      className="p-3 bg-gray-50 rounded border border-gray-200"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {complaint.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {complaint.description.substring(0, 50)}...
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded whitespace-nowrap ${
                            complaint.status === 'open'
                              ? 'bg-orange-100 text-orange-800'
                              : complaint.status === 'in-progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {complaint.status === 'open'
                            ? 'Ouvert'
                            : complaint.status === 'in-progress'
                              ? 'En cours'
                              : 'Résolu'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Announcements */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Annonces importantes
              </h3>
              <div className="space-y-3">
                {announcements
                  .filter((a) => a.importance === 'important')
                  .slice(0, 3)
                  .map((announcement) => (
                    <div
                      key={announcement.id}
                      className="p-3 bg-blue-50 rounded border border-blue-200"
                    >
                      <p className="font-medium text-gray-900">
                        {announcement.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {announcement.content}
                      </p>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="complaints">
          <div className="space-y-4">
            <ComplaintForm />
            {complaints.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Historique des réclamations
                </h3>
                <div className="space-y-3">
                  {complaints.map((complaint) => (
                    <div
                      key={complaint.id}
                      className="p-4 bg-gray-50 rounded border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">
                          {complaint.title}
                        </h4>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            complaint.status === 'open'
                              ? 'bg-orange-100 text-orange-800'
                              : complaint.status === 'in-progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {complaint.status === 'open'
                            ? 'Ouvert'
                            : complaint.status === 'in-progress'
                              ? 'En cours'
                              : 'Résolu'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {complaint.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Catégorie: {complaint.category}</span>
                        <span>{complaint.createdAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <MyPayments />
        </TabsContent>

        <TabsContent value="announcements">
          <div className="space-y-3">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {announcement.title}
                  </h3>
                  {announcement.importance === 'important' && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                      Important
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{announcement.content}</p>
                <p className="text-sm text-gray-500">{announcement.createdAt}</p>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <MessagesPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
