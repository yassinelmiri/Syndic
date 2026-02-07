'use client'

import { Card } from '@/components/ui/card'
import { getComplaints, getPayments, getBuilding } from '@/lib/data'

export default function SyndicOversight() {
  const complaints = getComplaints()
  const payments = getPayments()
  const building = getBuilding()

  const openComplaints = complaints.filter((c) => c.status === 'open')
  const inProgressComplaints = complaints.filter(
    (c) => c.status === 'in-progress'
  )
  const resolvedComplaints = complaints.filter((c) => c.status === 'resolved')

  const avgResolutionTime = resolvedComplaints.length > 0 ? 5 : 0 // Placeholder

  return (
    <div className="space-y-4">
      {/* Building Overview */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Aperçu de l'immeuble
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Nom</p>
            <p className="text-lg font-semibold text-gray-900">
              {building.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Adresse</p>
            <p className="text-lg font-semibold text-gray-900">
              {building.address}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Nombre de logements</p>
            <p className="text-lg font-semibold text-gray-900">
              {building.units}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Dernière maintenance</p>
            <p className="text-lg font-semibold text-gray-900">
              {building.lastMaintenanceDate}
            </p>
          </div>
        </div>
      </Card>

      {/* Complaints Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Total</p>
          <p className="text-3xl font-bold text-gray-900">
            {complaints.length}
          </p>
        </Card>
        <Card className="p-6 bg-orange-50 border-orange-200">
          <p className="text-sm text-orange-700 mb-2">Ouvertes</p>
          <p className="text-3xl font-bold text-orange-900">
            {openComplaints.length}
          </p>
        </Card>
        <Card className="p-6 bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-700 mb-2">En cours</p>
          <p className="text-3xl font-bold text-blue-900">
            {inProgressComplaints.length}
          </p>
        </Card>
        <Card className="p-6 bg-green-50 border-green-200">
          <p className="text-sm text-green-700 mb-2">Résolues</p>
          <p className="text-3xl font-bold text-green-900">
            {resolvedComplaints.length}
          </p>
        </Card>
      </div>



      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Open Complaints */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Réclamations ouvertes
          </h3>
          {openComplaints.length === 0 ? (
            <p className="text-center text-gray-600">
              Aucune réclamation ouverte
            </p>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {openComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="p-3 bg-orange-50 rounded border border-orange-200"
                >
                  <p className="font-medium text-gray-900">
                    {complaint.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {complaint.userName} - {complaint.apartment}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Depuis {complaint.createdAt}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Payment Overview */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            État des paiements
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <span className="text-green-900 font-medium">Payés</span>
              <span className="text-lg font-bold text-green-900">
                {payments.filter((p) => p.status === 'paid').length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
              <span className="text-blue-900 font-medium">En attente</span>
              <span className="text-lg font-bold text-blue-900">
                {payments.filter((p) => p.status === 'pending').length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded">
              <span className="text-red-900 font-medium">En retard</span>
              <span className="text-lg font-bold text-red-900">
                {payments.filter((p) => p.status === 'overdue').length}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
