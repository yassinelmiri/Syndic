export interface Message {
  id: string
  from: string
  to: string
  subject: string
  body: string
  read: boolean
  createdAt: string
  attachment?: string
}

export interface Complaint {
  id: string
  userId: string
  userName: string
  apartment: string
  title: string
  description: string
  category: string
  status: 'open' | 'in-progress' | 'resolved'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: string
  userId: string
  userName: string
  apartment: string
  amount: number
  dueDate: string
  paidDate?: string
  status: 'pending' | 'paid' | 'overdue'
  description: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  createdBy: string
  createdAt: string
  importance: 'normal' | 'important'
}

export interface Building {
  id: string
  name: string
  address: string
  units: number
  yearBuilt: number
  lastMaintenanceDate: string
}

const MESSAGES_KEY = 'syndic_messages'
const COMPLAINTS_KEY = 'syndic_complaints'
const PAYMENTS_KEY = 'syndic_payments'
const ANNOUNCEMENTS_KEY = 'syndic_announcements'
const BUILDING_KEY = 'syndic_building'

// Initialize sample data
export function initializeData() {
  if (typeof window === 'undefined') return

  const building = localStorage.getItem(BUILDING_KEY)
  if (!building) {
    localStorage.setItem(
      BUILDING_KEY,
      JSON.stringify({
        id: '1',
        name: 'Résidence Belle Vue',
        address: '123 Rue de la Paix, Paris 75000',
        units: 4,
        yearBuilt: 2005,
        lastMaintenanceDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
      })
    )
  }

  const messages = localStorage.getItem(MESSAGES_KEY)
  if (!messages) {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify([]))
  }

  const complaints = localStorage.getItem(COMPLAINTS_KEY)
  if (!complaints) {
    localStorage.setItem(
      COMPLAINTS_KEY,
      JSON.stringify([
        {
          id: '1',
          userId: '3',
          userName: 'Jean Dupont',
          apartment: 'Apt 101',
          title: 'Fuite au plafond',
          description:
            'Fuite d\'eau au plafond de la salle de bain depuis 3 jours',
          category: 'maintenance',
          status: 'open',
          priority: 'high',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
        },
        {
          id: '2',
          userId: '4',
          userName: 'Marie Martin',
          apartment: 'Apt 202',
          title: 'Bruit excessif',
          description: 'Bruit de travaux tard le soir',
          category: 'nuisance',
          status: 'in-progress',
          priority: 'medium',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
        },
      ])
    )
  }

  const payments = localStorage.getItem(PAYMENTS_KEY)
  if (!payments) {
    localStorage.setItem(
      PAYMENTS_KEY,
      JSON.stringify([
        {
          id: '1',
          userId: '3',
          userName: 'Jean Dupont',
          apartment: 'Apt 101',
          amount: 250,
          dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
          status: 'pending',
          description: 'Charges mensuelles - Février 2026',
        },
        {
          id: '2',
          userId: '4',
          userName: 'Marie Martin',
          apartment: 'Apt 202',
          amount: 250,
          dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
          status: 'overdue',
          description: 'Charges mensuelles - Janvier 2026',
        },
        {
          id: '3',
          userId: '3',
          userName: 'Jean Dupont',
          apartment: 'Apt 101',
          amount: 250,
          dueDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
          paidDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
          status: 'paid',
          description: 'Charges mensuelles - Décembre 2025',
        },
      ])
    )
  }

  const announcements = localStorage.getItem(ANNOUNCEMENTS_KEY)
  if (!announcements) {
    localStorage.setItem(
      ANNOUNCEMENTS_KEY,
      JSON.stringify([
        {
          id: '1',
          title: 'Fermeture du portail',
          content: 'Le portail sera fermé le 14 février pour maintenance.',
          createdBy: '2',
          createdAt: new Date().toISOString().split('T')[0],
          importance: 'important',
        },
        {
          id: '2',
          title: 'Réunion de copropriétaires',
          content:
            'Réunion générale prévue le 1er mars à 19h00 dans la salle commune.',
          createdBy: '2',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
          importance: 'important',
        },
      ])
    )
  }
}

export function getBuilding(): Building {
  if (typeof window === 'undefined') return {} as Building

  initializeData()
  const data = localStorage.getItem(BUILDING_KEY)
  return data ? JSON.parse(data) : ({} as Building)
}

export function getMessages(): Message[] {
  if (typeof window === 'undefined') return []

  initializeData()
  const data = localStorage.getItem(MESSAGES_KEY)
  return data ? JSON.parse(data) : []
}

export function addMessage(message: Omit<Message, 'id' | 'createdAt'>) {
  if (typeof window === 'undefined') return

  const messages = getMessages()
  const newMessage: Message = {
    ...message,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  messages.push(newMessage)
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
}

export function getComplaints(): Complaint[] {
  if (typeof window === 'undefined') return []

  initializeData()
  const data = localStorage.getItem(COMPLAINTS_KEY)
  return data ? JSON.parse(data) : []
}

export function addComplaint(complaint: Omit<Complaint, 'id'>) {
  if (typeof window === 'undefined') return

  const complaints = getComplaints()
  const newComplaint: Complaint = {
    ...complaint,
    id: Date.now().toString(),
  }
  complaints.push(newComplaint)
  localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints))
}

export function updateComplaintStatus(
  complaintId: string,
  status: Complaint['status']
) {
  if (typeof window === 'undefined') return

  const complaints = getComplaints()
  const complaint = complaints.find((c) => c.id === complaintId)
  if (complaint) {
    complaint.status = status
    complaint.updatedAt = new Date().toISOString().split('T')[0]
    localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints))
  }
}

export function getPayments(): Payment[] {
  if (typeof window === 'undefined') return []

  initializeData()
  const data = localStorage.getItem(PAYMENTS_KEY)
  return data ? JSON.parse(data) : []
}

export function markPaymentAsPaid(paymentId: string) {
  if (typeof window === 'undefined') return

  const payments = getPayments()
  const payment = payments.find((p) => p.id === paymentId)
  if (payment) {
    payment.status = 'paid'
    payment.paidDate = new Date().toISOString().split('T')[0]
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments))
  }
}

export function getAnnouncements(): Announcement[] {
  if (typeof window === 'undefined') return []

  initializeData()
  const data = localStorage.getItem(ANNOUNCEMENTS_KEY)
  return data ? JSON.parse(data) : []
}

export function addAnnouncement(
  announcement: Omit<Announcement, 'id' | 'createdAt'>
) {
  if (typeof window === 'undefined') return

  const announcements = getAnnouncements()
  const newAnnouncement: Announcement = {
    ...announcement,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0],
  }
  announcements.push(newAnnouncement)
  localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(announcements))
}
