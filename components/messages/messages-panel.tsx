'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getMessages, addMessage } from '@/lib/data'
import { useAuth } from '@/hooks/use-auth'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'syndic' | 'utilisateur'
  apartment?: string
}

export default function MessagesPanel() {
  const { user } = useAuth()
  const [messages, setMessages] = useState(getMessages())
  const [users, setUsers] = useState<User[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    body: '',
  })

  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      const allUsers = JSON.parse(storedUsers)
      setUsers(allUsers.filter((u: User) => u.id !== user?.id))
    }
  }, [user?.id])

  const userMessages = messages.filter(
    (m) => m.from === user?.id || m.to === user?.id
  )

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.to && formData.subject.trim() && formData.body.trim()) {
      addMessage({
        from: user?.id || '',
        to: formData.to,
        subject: formData.subject,
        body: formData.body,
        read: false,
      })
      setMessages(getMessages())
      setFormData({ to: '', subject: '', body: '' })
      setShowForm(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Send Button */}
      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Annuler' : '+ Nouveau message'}
      </Button>

      {/* Form */}
      {showForm && (
        <Card className="p-6">
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destinataire
              </label>
              <select
                value={formData.to}
                onChange={(e) =>
                  setFormData({ ...formData, to: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Sélectionner un destinataire</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sujet
              </label>
              <Input
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                placeholder="Sujet du message"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={formData.body}
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
                placeholder="Votre message"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            <Button type="submit">Envoyer</Button>
          </form>
        </Card>
      )}

      {/* Messages List */}
      <div className="space-y-3">
        {userMessages.length === 0 ? (
          <Card className="p-6">
            <p className="text-center text-gray-600">
              Aucun message pour le moment
            </p>
          </Card>
        ) : (
          userMessages.map((message) => {
            const storedUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users') || '[]') : []
            const otherUser = storedUsers.find(
              (u: User) =>
                u.id ===
                (message.from === user?.id ? message.to : message.from)
            )
            return (
              <Card key={message.id} className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {message.from === user?.id ? 'À:' : 'De:'}{' '}
                      <span className="text-gray-900 font-semibold">
                        {otherUser?.name}
                      </span>
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {message.subject}
                    </p>
                  </div>
                  {!message.read && message.to === user?.id && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      Non lu
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-3">{message.body}</p>
                <p className="text-sm text-gray-500">{message.createdAt}</p>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
