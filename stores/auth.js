import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    role: null,
  }),
  actions: {
    async login(credentials) {
      const users = await $fetch('/api/users')
      const found = users.find(u => u.email === credentials.email && u.password === credentials.password)
      if (!found) throw new Error('Invalid credentials')
      this.user = { id: found.id, name: found.name, email: found.email, designation: found.designation, jurisdiction: found.jurisdiction }
      this.role = found.role
      this.token = 'mock-jwt-' + Date.now()
      if (process.client) localStorage.setItem('auth', JSON.stringify({ user: this.user, role: this.role, token: this.token }))
      return found.role
    },
    logout() {
      this.user = null; this.token = null; this.role = null
      if (process.client) localStorage.removeItem('auth')
      navigateTo('/auth/login')
    },
    restore() {
      if (process.client) {
        const saved = localStorage.getItem('auth')
        if (saved) { const d = JSON.parse(saved); this.user = d.user; this.role = d.role; this.token = d.token }
      }
    }
  }
})
