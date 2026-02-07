'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getPayments, markPaymentAsPaid, type Payment } from '@/lib/data'

export default function PaymentsManager() {
  const [payments, setPayments] = useState(getPayments())
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'paid' | 'overdue'>(
    'all'
  )

  const filteredPayments =
    filterStatus === 'all'
      ? payments
      : payments.filter((p) => p.status === filterStatus as Payment['status'])

  const handleMarkAsPaid = (paymentId: string) => {
    markPaymentAsPaid(paymentId)
    const updated = payments.map((p) =>
      p.id === paymentId
        ? {
            ...p,
            status: 'paid' as const,
            paidDate: new Date().toISOString().split('T')[0],
          }
        : p
    )
    setPayments(updated)
  }

  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0)
  const paidAmount = filteredPayments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'paid', 'overdue'] as const).map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? 'default' : 'outline'}
            onClick={() => setFilterStatus(status)}
            size="sm"
          >
            {status === 'all'
              ? 'Tous'
              : status === 'pending'
                ? 'En attente'
                : status === 'paid'
                  ? 'Payés'
                  : 'En retard'}
          </Button>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Total</p>
          <p className="text-2xl font-bold text-gray-900">{totalAmount}Dhs</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Collecté</p>
          <p className="text-2xl font-bold text-green-600">{paidAmount}Dhs</p>
        </Card>
      </div>

      {/* Payments List */}
      <div className="space-y-3">
        {filteredPayments.map((payment) => (
          <Card key={payment.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {payment.userName}
                </h3>
                <p className="text-sm text-gray-600">
                  {payment.apartment} - {payment.description}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {payment.amount}Dhs
                </p>
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded mt-2 ${
                    payment.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : payment.status === 'pending'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {payment.status === 'paid'
                    ? 'Payé'
                    : payment.status === 'pending'
                      ? 'En attente'
                      : 'En retard'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <p>
                  Échéance:{' '}
                  <span className="font-medium text-gray-900">
                    {payment.dueDate}
                  </span>
                </p>
                {payment.paidDate && (
                  <p>
                    Payé le:{' '}
                    <span className="font-medium text-gray-900">
                      {payment.paidDate}
                    </span>
                  </p>
                )}
              </div>
              {payment.status !== 'paid' && (
                <Button size="sm" onClick={() => handleMarkAsPaid(payment.id)}>
                  Marquer comme payé
                </Button>
              )}
            </div>
          </Card>
        ))}

        {filteredPayments.length === 0 && (
          <Card className="p-6">
            <p className="text-center text-gray-600">
              Aucun paiement avec ce statut
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
