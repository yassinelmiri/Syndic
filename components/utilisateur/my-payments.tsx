'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getPayments, markPaymentAsPaid } from '@/lib/data'
import { useAuth } from '@/hooks/use-auth'

export default function MyPayments() {
  const { user } = useAuth()
  const [payments, setPayments] = useState(getPayments())
  const userPayments = payments.filter((p) => p.userId === user?.id)

  const handleMarkAsPaid = (paymentId: string) => {
    markPaymentAsPaid(paymentId)
    setPayments(getPayments())
  }

  const pending = userPayments.filter((p) => p.status === 'pending' || p.status === 'overdue')
  const totalDue = pending.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-4">
      {/* Summary */}
      {pending.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 bg-red-50 border-red-200">
            <p className="text-sm text-red-700 mb-1">Montant total dû</p>
            <p className="text-3xl font-bold text-red-900">{totalDue}Dhs</p>
          </Card>
          <Card className="p-4 bg-orange-50 border-orange-200">
            <p className="text-sm text-orange-700 mb-1">Paiements en attente</p>
            <p className="text-3xl font-bold text-orange-900">{pending.length}</p>
          </Card>
        </div>
      )}

      {/* Payments List */}
      <div className="space-y-3">
        {userPayments.length === 0 ? (
          <Card className="p-6">
            <p className="text-center text-gray-600">
              Aucun paiement pour le moment
            </p>
          </Card>
        ) : (
          userPayments.map((payment) => (
            <Card
              key={payment.id}
              className={`p-6 ${
                payment.status === 'overdue'
                  ? 'border-red-200 bg-red-50'
                  : payment.status === 'pending'
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-green-200 bg-green-50'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {payment.description}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Logement: {payment.apartment}
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
                      ? '✓ Payé'
                      : payment.status === 'pending'
                        ? 'En attente'
                        : '⚠ En retard'}
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
                  <Button
                    size="sm"
                    onClick={() => handleMarkAsPaid(payment.id)}
                  >
                    Marquer comme payé
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
