'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  getComplaints,
  updateComplaintStatus,
  type Complaint,
} from '@/lib/data'

export default function ComplaintsManager() {
  const [complaints, setComplaints] = useState(getComplaints())
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'in-progress' | 'resolved'>('all')

  const filteredComplaints =
    filterStatus === 'all'
      ? complaints
      : complaints.filter((c) => c.status === filterStatus.replace('-', ' ') as Complaint['status'])

  const handleStatusChange = (
    complaintId: string,
    newStatus: Complaint['status']
  ) => {
    updateComplaintStatus(complaintId, newStatus)
    const updated = complaints.map((c) =>
      c.id === complaintId ? { ...c, status: newStatus } : c
    )
    setComplaints(updated)
  }

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'open', 'in-progress', 'resolved'] as const).map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? 'default' : 'outline'}
            onClick={() => setFilterStatus(status)}
            size="sm"
          >
            {status === 'all'
              ? 'Toutes'
              : status === 'open'
                ? 'Ouvertes'
                : status === 'in-progress'
                  ? 'En cours'
                  : 'Résolues'}
          </Button>
        ))}
      </div>

      {/* Complaints List */}
      <div className="space-y-3">
        {filteredComplaints.map((complaint) => (
          <Card key={complaint.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {complaint.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {complaint.userName} - {complaint.apartment}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    complaint.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : complaint.priority === 'medium'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {complaint.priority === 'high'
                    ? 'Haute'
                    : complaint.priority === 'medium'
                      ? 'Moyenne'
                      : 'Basse'}
                </span>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded ${
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

            <p className="text-gray-700 mb-4">{complaint.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <p>Catégorie: {complaint.category}</p>
                <p>Créé le: {complaint.createdAt}</p>
              </div>
              <div className="flex gap-2">
                {complaint.status !== 'open' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusChange(complaint.id, 'open')}
                  >
                    Rouvrir
                  </Button>
                )}
                {complaint.status !== 'in-progress' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleStatusChange(complaint.id, 'in-progress')
                    }
                  >
                    Reprendre
                  </Button>
                )}
                {complaint.status !== 'resolved' && (
                  <Button
                    size="sm"
                    onClick={() => handleStatusChange(complaint.id, 'resolved')}
                  >
                    Résoudre
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}

        {filteredComplaints.length === 0 && (
          <Card className="p-6">
            <p className="text-center text-gray-600">
              Aucune réclamation avec ce statut
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
