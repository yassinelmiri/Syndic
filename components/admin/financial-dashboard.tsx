'use client'

import { Card } from '@/components/ui/card'
import { getPayments } from '@/lib/data'

export default function FinancialDashboard() {
  const payments = getPayments()

  const paidPayments = payments.filter((p) => p.status === 'paid')
  const pendingPayments = payments.filter((p) => p.status === 'pending')
  const overduePayments = payments.filter((p) => p.status === 'overdue')

  const paidTotal = paidPayments.reduce((sum, p) => sum + p.amount, 0)
  const pendingTotal = pendingPayments.reduce((sum, p) => sum + p.amount, 0)
  const overdueTotal = overduePayments.reduce((sum, p) => sum + p.amount, 0)
  const totalExpected = paidTotal + pendingTotal + overdueTotal

  const collectionRate =
    totalExpected > 0 ? ((paidTotal / totalExpected) * 100).toFixed(1) : 0

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-green-50 border-green-200">
          <p className="text-sm text-green-700 mb-2">Collecté</p>
          <p className="text-3xl font-bold text-green-900">{paidTotal}Dhs</p>
          <p className="text-xs text-green-700 mt-2">
            {paidPayments.length} paiement(s)
          </p>
        </Card>

        <Card className="p-6 bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-700 mb-2">En attente</p>
          <p className="text-3xl font-bold text-blue-900">{pendingTotal}Dhs</p>
          <p className="text-xs text-blue-700 mt-2">
            {pendingPayments.length} paiement(s)
          </p>
        </Card>

        <Card className="p-6 bg-red-50 border-red-200">
          <p className="text-sm text-red-700 mb-2">En retard</p>
          <p className="text-3xl font-bold text-red-900">{overdueTotal}Dhs</p>
          <p className="text-xs text-red-700 mt-2">
            {overduePayments.length} paiement(s)
          </p>
        </Card>

        <Card className="p-6 bg-purple-50 border-purple-200">
          <p className="text-sm text-purple-700 mb-2">Taux de collecte</p>
          <p className="text-3xl font-bold text-purple-900">{collectionRate}%</p>
          <p className="text-xs text-purple-700 mt-2">
            {totalExpected}Dhs attendus
          </p>
        </Card>
      </div>

      {/* Payment Status Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Paid Payments */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            ✓ Paiements effectués
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {paidPayments.map((payment) => (
              <div
                key={payment.id}
                className="p-3 bg-green-50 rounded border border-green-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {payment.userName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {payment.apartment}
                    </p>
                  </div>
                  <p className="font-semibold text-green-900">
                    {payment.amount}Dhs
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Payé le {payment.paidDate}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Payments */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            ⏳ Paiements en attente
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {pendingPayments.map((payment) => (
              <div
                key={payment.id}
                className="p-3 bg-blue-50 rounded border border-blue-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {payment.userName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {payment.apartment}
                    </p>
                  </div>
                  <p className="font-semibold text-blue-900">
                    {payment.amount}Dhs
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Échéance: {payment.dueDate}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Overdue Payments */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          ⚠ Paiements en retard ({overduePayments.length})
        </h3>
        {overduePayments.length === 0 ? (
          <p className="text-center text-gray-600">Aucun paiement en retard</p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {overduePayments.map((payment) => (
              <div
                key={payment.id}
                className="p-3 bg-red-50 rounded border border-red-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {payment.userName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {payment.apartment}
                    </p>
                  </div>
                  <p className="font-semibold text-red-900">
                    {payment.amount}Dhs
                  </p>
                </div>
                <p className="text-xs text-red-600 mt-1 font-semibold">
                  En retard depuis {payment.dueDate}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
