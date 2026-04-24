import { defineStore } from 'pinia'

export const useComplaintsStore = defineStore('complaints', {
  state: () => ({
    all: [], loading: false, error: null,
    filters: { status: null, category: null, district: null, priority: null },
    activeComplaint: null, newComplaintToken: null
  }),
  getters: {
    filtered: (state) => state.all.filter(c => {
      if (state.filters.status && c.status !== state.filters.status) return false
      if (state.filters.category && c.category !== state.filters.category) return false
      if (state.filters.district && c.district !== state.filters.district) return false
      if (state.filters.priority && c.priority !== state.filters.priority) return false
      return true
    }),
    openCount: (state) => state.all.filter(c => !['Resolved', 'Closed'].includes(c.status)).length,
    escalatedCount: (state) => state.all.filter(c => c.is_escalated).length,
  },
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const res = await $fetch('/api/complaints', { query: { limit: 500 } })
        const apiData = Array.isArray(res) ? res : (res.data ?? [])
        // Load locally submitted complaints from localStorage
        const localComplaints = process.client ? JSON.parse(localStorage.getItem('localComplaints') || '[]') : []
        // Merge: local complaints first, then API data (avoiding duplicates)
        const merged = [...localComplaints, ...apiData.filter(a => !localComplaints.find(l => l.id === a.id))]
        this.all = merged
      }
      finally { this.loading = false }
    },
    async submit(data) {
      const token = 'TRK' + Math.floor(1000 + Math.random() * 9000) + 'PBH'
      const id = 'GRV/' + new Date().getFullYear() + '/' + String(new Date().getMonth()+1).padStart(2,'0') + '/' + Math.floor(10000 + Math.random() * 90000)
      const complaint = { ...data, id, token, status: 'Submitted', is_escalated: false, rating: null,
        submitted_at: new Date().toISOString(),
        timeline: [{ date: new Date().toISOString(), status: 'Submitted', actor: 'System', note: 'शिकायत दर्ज की गई — Complaint registered successfully' }]
      }
      this.all.unshift(complaint)
      this.newComplaintToken = token
      // Persist to localStorage
      if (process.client) {
        const localComplaints = JSON.parse(localStorage.getItem('localComplaints') || '[]')
        localComplaints.unshift(complaint)
        localStorage.setItem('localComplaints', JSON.stringify(localComplaints))
      }
      return { id, token }
    },
    async updateStatus(id, status, note, actor) {
      await new Promise(r => setTimeout(r, 800))
      const c = this.all.find(c => c.id === id)
      if (c) { c.status = status; c.timeline.push({ date: new Date().toISOString(), status, actor, note }) }
    },
    findByToken(token) { return this.all.find(c => c.token === token) }
  }
})
