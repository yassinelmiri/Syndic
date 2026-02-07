'use client'

import React from "react"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getAnnouncements, addAnnouncement } from '@/lib/data'
import { useAuth } from '@/hooks/use-auth'

export default function AnnouncementsManager() {
  const { user } = useAuth()
  const [announcements, setAnnouncements] = useState(getAnnouncements())
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    importance: 'normal' as const,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim() && formData.content.trim()) {
      addAnnouncement({
        title: formData.title,
        content: formData.content,
        importance: formData.importance,
        createdBy: user?.id || '',
      })
      setAnnouncements(getAnnouncements())
      setFormData({ title: '', content: '', importance: 'normal' })
      setShowForm(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Add Button */}
      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Annuler' : '+ Nouvelle annonce'}
      </Button>

      {/* Form */}
      {showForm && (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre
              </label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Titre de l'annonce"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contenu
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Contenu de l'annonce"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Importance
              </label>
              <select
                value={formData.importance}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    importance: e.target.value as 'normal' | 'important',
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="normal">Normal</option>
                <option value="important">Important</option>
              </select>
            </div>

            <Button type="submit">Publier</Button>
          </form>
        </Card>
      )}

      {/* Announcements List */}
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {announcement.title}
              </h3>
              {announcement.importance === 'important' && (
                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                  Important
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-3">{announcement.content}</p>
            <p className="text-sm text-gray-500">
              Publié le {announcement.createdAt}
            </p>
          </Card>
        ))}

        {announcements.length === 0 && (
          <Card className="p-6">
            <p className="text-center text-gray-600">
              Aucune annonce pour le moment
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
