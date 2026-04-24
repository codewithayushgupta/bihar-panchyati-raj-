<template>
  <AdminLayout>
    <div class="space-y-6">
      <h1 class="page-title">My Profile</h1>

      <!-- Profile Card -->
      <div class="card p-6">
        <div class="flex items-start gap-6 flex-wrap">
          <!-- Avatar -->
          <div class="flex flex-col items-center gap-3">
            <div class="w-24 h-24 rounded-full bg-[var(--color-100)] dark:bg-[var(--color-900)]/30 flex items-center justify-center text-[var(--color-600)] dark:text-[var(--color-400)] text-3xl font-bold">
              {{ authStore.user?.name?.charAt(0) }}
            </div>
            <span class="px-3 py-1 bg-[var(--color-600)] text-white text-xs rounded-full font-medium">{{ roleLabel }}</span>
          </div>

          <!-- Details -->
          <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-1">{{ authStore.user?.name }}</h2>
            <p class="text-[var(--color-600)] dark:text-[var(--color-400)] font-medium mb-3">{{ authStore.user?.designation }}</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label class="text-xs text-[var(--text-secondary)] uppercase tracking-wide">User ID</label>
                <p class="font-mono text-sm text-[var(--text-primary)] mt-1">{{ authStore.user?.id }}</p>
              </div>
              <div>
                <label class="text-xs text-[var(--text-secondary)] uppercase tracking-wide">Email</label>
                <p class="text-sm text-[var(--text-primary)] mt-1">{{ authStore.user?.email }}</p>
              </div>
              <div>
                <label class="text-xs text-[var(--text-secondary)] uppercase tracking-wide">Role</label>
                <p class="text-sm text-[var(--text-primary)] mt-1 capitalize">{{ authStore.role?.replace('_', ' ') }}</p>
              </div>
              <div>
                <label class="text-xs text-[var(--text-secondary)] uppercase tracking-wide">Jurisdiction</label>
                <p class="text-sm text-[var(--text-primary)] mt-1">{{ authStore.user?.jurisdiction || 'N/A' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Access Permissions -->
      <div class="card p-6">
        <h3 class="section-title mb-4">Access Permissions</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div v-for="perm in permissions" :key="perm.module" class="flex items-center gap-3 p-3 rounded-lg" :class="perm.access ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800'">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="perm.access ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'">
              <svg v-if="perm.access" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </div>
            <div class="flex-1">
              <div class="text-sm font-medium text-[var(--text-primary)]">{{ perm.module }}</div>
              <div class="text-xs text-[var(--text-secondary)]">{{ perm.level }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Summary -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="card p-5">
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <div>
              <div class="text-xs text-[var(--text-secondary)]">Last Login</div>
              <div class="text-sm font-medium text-[var(--text-primary)]">{{ formatDate(new Date()) }}</div>
            </div>
          </div>
        </div>

        <div class="card p-5">
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <div class="text-xs text-[var(--text-secondary)]">Actions This Month</div>
              <div class="text-sm font-medium text-[var(--text-primary)]">{{ actionsCount }}</div>
            </div>
          </div>
        </div>

        <div class="card p-5">
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <div class="text-xs text-[var(--text-secondary)]">Account Status</div>
              <div class="text-sm font-medium text-green-600 dark:text-green-400">Active</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Change Password -->
      <div class="card p-6">
        <h3 class="section-title mb-4">Change Password</h3>
        <form @submit.prevent="changePassword" class="max-w-md space-y-4">
          <div>
            <label class="label-text">Current Password</label>
            <input v-model="passwordForm.current" type="password" class="input-field" required />
          </div>
          <div>
            <label class="label-text">New Password</label>
            <input v-model="passwordForm.new" type="password" class="input-field" required minlength="8" />
          </div>
          <div>
            <label class="label-text">Confirm New Password</label>
            <input v-model="passwordForm.confirm" type="password" class="input-field" required />
          </div>
          <div v-if="passwordError" class="text-red-500 dark:text-red-400 text-sm">{{ passwordError }}</div>
          <div v-if="passwordSuccess" class="text-green-600 dark:text-green-400 text-sm">{{ passwordSuccess }}</div>
          <button type="submit" class="btn-primary">Update Password</button>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()

const roleLabel = computed(() => ({
  state_admin: 'State Admin',
  district_admin: 'District Admin',
  block_admin: 'Block Admin',
  panchayat_admin: 'Panchayat Admin',
  citizen: 'Citizen'
}[authStore.role] || 'User'))

const permissions = computed(() => {
  const role = authStore.role
  return [
    { module: 'Dashboard', level: 'Full Access', access: true },
    { module: 'Complaints Management', level: role === 'state_admin' ? 'All Districts' : 'Jurisdiction Only', access: true },
    { module: 'Fund Management', level: role === 'state_admin' ? 'All Districts' : 'Jurisdiction Only', access: true },
    { module: 'Projects', level: role === 'state_admin' ? 'All Districts' : 'Jurisdiction Only', access: true },
    { module: 'Panchayat Management', level: role === 'state_admin' ? 'All Districts' : 'Jurisdiction Only', access: true },
    { module: 'MIS / Officers', level: 'View & Monitor', access: ['state_admin', 'district_admin'].includes(role) },
    { module: 'Training Management', level: 'Assign & Track', access: ['state_admin', 'district_admin'].includes(role) },
    { module: 'API Integrations', level: 'View Status', access: ['state_admin', 'district_admin'].includes(role) },
  ]
})

const actionsCount = computed(() => {
  const role = authStore.role
  if (role === 'state_admin') return 247
  if (role === 'district_admin') return 89
  if (role === 'block_admin') return 34
  return 12
})

const passwordForm = ref({ current: '', new: '', confirm: '' })
const passwordError = ref('')
const passwordSuccess = ref('')

function changePassword() {
  passwordError.value = ''
  passwordSuccess.value = ''
  
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    passwordError.value = 'New passwords do not match'
    return
  }
  
  if (passwordForm.value.new.length < 8) {
    passwordError.value = 'Password must be at least 8 characters'
    return
  }
  
  // Simulate password change
  passwordSuccess.value = 'Password updated successfully'
  passwordForm.value = { current: '', new: '', confirm: '' }
  setTimeout(() => { passwordSuccess.value = '' }, 3000)
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
</script>
