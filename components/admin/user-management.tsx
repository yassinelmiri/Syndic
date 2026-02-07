'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'syndic' | 'utilisateur'
  apartment?: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }
  }, [])

  const adminUsers = users.filter((u) => u.role === 'admin')
  const syndicUsers = users.filter((u) => u.role === 'syndic')
  const utilisateurUsers = users.filter((u) => u.role === 'utilisateur')

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Administrateurs
          </h3>
          <p className="text-3xl font-bold text-blue-600 mb-4">
            {adminUsers.length}
          </p>
          <div className="space-y-2">
            {adminUsers.map((user) => (
              <div key={user.id} className="p-2 bg-gray-50 rounded">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Gestionnaires
          </h3>
          <p className="text-3xl font-bold text-green-600 mb-4">
            {syndicUsers.length}
          </p>
          <div className="space-y-2">
            {syndicUsers.map((user) => (
              <div key={user.id} className="p-2 bg-gray-50 rounded">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Résidents
          </h3>
          <p className="text-3xl font-bold text-purple-600 mb-4">
            {utilisateurUsers.length}
          </p>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {utilisateurUsers.map((user) => (
              <div key={user.id} className="p-2 bg-gray-50 rounded">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500">{user.apartment}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* All Users Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tous les utilisateurs
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-2 px-4 font-semibold text-gray-900">
                  Nom
                </th>
                <th className="text-left py-2 px-4 font-semibold text-gray-900">
                  Email
                </th>
                <th className="text-left py-2 px-4 font-semibold text-gray-900">
                  Rôle
                </th>
                <th className="text-left py-2 px-4 font-semibold text-gray-900">
                  Logement
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        user.role === 'admin'
                          ? 'bg-red-100 text-red-800'
                          : user.role === 'syndic'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {user.role === 'admin'
                        ? 'Admin'
                        : user.role === 'syndic'
                          ? 'Gestionnaire'
                          : 'Résident'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {user.apartment || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
