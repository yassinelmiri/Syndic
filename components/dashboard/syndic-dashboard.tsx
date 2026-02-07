'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getPayments, getComplaints, getAnnouncements, getBuilding, updateComplaintStatus } from '@/lib/data'
import ComplaintsManager from '@/components/syndic/complaints-manager'
import PaymentsManager from '@/components/syndic/payments-manager'
import AnnouncementsManager from '@/components/syndic/announcements-manager'
import MessagesPanel from '@/components/messages/messages-panel'

export default function SyndicDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const building = getBuilding()
  const complaints = getComplaints()
  const payments = getPayments()
  const announcements = getAnnouncements()

  const pendingComplaints = complaints.filter((c) => c.status === 'open').length
  const overduePayments = payments.filter((p) => p.status === 'overdue').length
  const totalUnpaid = payments
    .filter((p) => p.status === 'pending' || p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Tableau de bord Gestionnaire
        </h2>
        <p className="text-gray-600">{building.name}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Logements</div>
          <div className="text-3xl font-bold text-gray-900">
            {building.units}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Réclamations ouvertes</div>
          <div className="text-3xl font-bold text-orange-600">
            {pendingComplaints}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Paiements en retard</div>
          <div className="text-3xl font-bold text-red-600">
            {overduePayments}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Montant en attente</div>
          <div className="text-3xl font-bold text-blue-600">
            {totalUnpaid}Dhs
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="complaints">Réclamations</TabsTrigger>
          <TabsTrigger value="payments">Paiements</TabsTrigger>
          <TabsTrigger value="announcements">Annonces</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Recent Complaints */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Réclamations récentes
              </h3>
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
                        <p className="text-sm text-gray-600">
                          {complaint.userName} - {complaint.apartment}
                        </p>
                      </div>
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
                  </div>
                ))}
              </div>
            </Card>

            {/* Announcements */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Annonces
              </h3>
              <div className="space-y-3">
                {announcements.slice(0, 3).map((announcement) => (
                  <div
                    key={announcement.id}
                    className="p-3 bg-gray-50 rounded border border-gray-200"
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
          <ComplaintsManager />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentsManager />
        </TabsContent>

        <TabsContent value="announcements">
          <AnnouncementsManager />
        </TabsContent>

        <TabsContent value="messages">
          <MessagesPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
