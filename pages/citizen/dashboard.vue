<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />
    <div class="max-w-5xl mx-auto px-4 py-8">

      <!-- Welcome Header -->
      <div class="card p-6 mb-6 bg-gradient-to-r from-prd-amber-700 to-prd-amber-600 border-0">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold">
            {{ authStore.user?.name?.charAt(0) }}
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">Welcome, {{ authStore.user?.name }}</h1>
            <p class="text-[var(--color-200)] text-sm mt-0.5">Citizen Portal — Government of Bihar</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <NuxtLink to="/grievance" class="card p-4 flex flex-col items-center gap-2 hover:border-[var(--color-400)] hover:shadow-md transition-all text-center">
          <div class="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </div>
          <span class="text-xs font-medium text-[var(--text-primary)]">File Complaint</span>
        </NuxtLink>
        <NuxtLink to="/grievance/track" class="card p-4 flex flex-col items-center gap-2 hover:border-[var(--color-400)] hover:shadow-md transition-all text-center">
          <div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <span class="text-xs font-medium text-[var(--text-primary)]">Track Complaint</span>
        </NuxtLink>
        <NuxtLink to="/schemes" class="card p-4 flex flex-col items-center gap-2 hover:border-[var(--color-400)] hover:shadow-md transition-all text-center">
          <div class="w-12 h-12 rounded-xl bg-[var(--color-100)] dark:bg-[var(--color-900)]/30 flex items-center justify-center text-[var(--color-600)]">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          </div>
          <span class="text-xs font-medium text-[var(--text-primary)]">View Schemes</span>
        </NuxtLink>
        <NuxtLink to="/notices" class="card p-4 flex flex-col items-center gap-2 hover:border-[var(--color-400)] hover:shadow-md transition-all text-center">
          <div class="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          </div>
          <span class="text-xs font-medium text-[var(--text-primary)]">Notices</span>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- My Complaints -->
        <div class="card p-5">
          <div class="flex items-center justify-between mb-4">
            <h2 class="section-title">My Complaints</h2>
            <NuxtLink to="/grievance" class="text-[var(--color-600)] dark:text-[var(--color-400)] text-sm hover:underline">+ New</NuxtLink>
          </div>
          <div v-if="myComplaints.length" class="space-y-3">
            <div v-for="c in myComplaints" :key="c.id"
              class="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-secondary)] cursor-pointer hover:bg-[var(--color-50)] dark:hover:bg-[var(--color-900)]/20 transition-colors"
              @click="navigateTo('/grievance/track?token=' + c.token)">
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-[var(--text-primary)] truncate">{{ c.category }}</div>
                <div class="text-xs text-[var(--text-secondary)] mt-0.5">{{ c.panchayat }}, {{ c.district }}</div>
                <div class="font-mono text-xs text-[var(--color-600)] dark:text-[var(--color-400)] mt-1">{{ c.token }}</div>
              </div>
              <StatusBadge :status="c.status" />
            </div>
          </div>
          <div v-else class="text-center py-8">
            <div class="text-4xl mb-2">📋</div>
            <p class="text-sm text-[var(--text-secondary)]">No complaints filed yet</p>
            <NuxtLink to="/grievance" class="btn-primary mt-3 text-sm inline-flex">File a Complaint</NuxtLink>
          </div>
        </div>

        <!-- Profile Info -->
        <div class="card p-5">
          <h2 class="section-title mb-4">My Profile</h2>
          <div class="space-y-0 text-sm">
            <div class="flex justify-between py-3 border-b border-[var(--border-color)]">
              <span class="text-[var(--text-secondary)]">Full Name</span>
              <span class="font-medium text-[var(--text-primary)]">{{ authStore.user?.name }}</span>
            </div>
            <div class="flex justify-between py-3 border-b border-[var(--border-color)]">
              <span class="text-[var(--text-secondary)]">Email</span>
              <span class="font-medium text-[var(--text-primary)]">{{ authStore.user?.email }}</span>
            </div>
            <div class="flex justify-between py-3 border-b border-[var(--border-color)]">
              <span class="text-[var(--text-secondary)]">Account Type</span>
              <span class="px-2 py-0.5 bg-[var(--color-100)] dark:bg-[var(--color-900)]/30 text-[var(--color-700)] dark:text-[var(--color-400)] rounded-full text-xs font-medium">Citizen</span>
            </div>
            <div class="flex justify-between py-3">
              <span class="text-[var(--text-secondary)]">Complaints Filed</span>
              <span class="font-medium text-[var(--text-primary)]">{{ myComplaints.length }}</span>
            </div>
          </div>
          <button @click="authStore.logout()" class="btn-secondary w-full justify-center mt-5 text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            Logout
          </button>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: false })

const authStore = useAuthStore()
authStore.restore()

if (process.client) {
  if (!authStore.token) navigateTo('/auth/login')
  else if (authStore.role !== 'citizen') navigateTo('/admin')
}

const myComplaints = ref([])
onMounted(() => {
  myComplaints.value = JSON.parse(localStorage.getItem('localComplaints') || '[]')
})
</script>
