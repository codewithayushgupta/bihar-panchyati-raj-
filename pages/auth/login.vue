<template>
  <div class="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-[var(--color-600)] rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">PRD</div>
        <h1 class="text-2xl font-bold text-[var(--text-primary)]">Bihar PRD Portal</h1>
        <p class="text-[var(--text-secondary)] text-sm mt-1">Panchayati Raj Department — Admin Login</p>
      </div>

      <div class="card p-6">
        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label class="label-text">Email Address</label>
            <input v-model="form.email" type="email" class="input-field" placeholder="officer@bihar.gov.in" required />
          </div>
          <div>
            <label class="label-text">Password</label>
            <div class="relative">
              <input v-model="form.password" :type="showPwd ? 'text' : 'password'" class="input-field pr-10" placeholder="Enter password" required />
              <button type="button" @click="showPwd = !showPwd" class="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="showPwd ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'"/></svg>
              </button>
            </div>
          </div>
          <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-400 text-sm">{{ error }}</div>
          <button type="submit" class="btn-primary w-full justify-center py-3" :disabled="loading">
            <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <!-- Demo Accounts -->
        <div class="mt-5 pt-5 border-t border-[var(--border-color)]">
          <p class="text-xs text-[var(--text-secondary)] mb-3 text-center">Demo Accounts</p>
          <div class="grid grid-cols-2 gap-2">
            <button v-for="u in demoUsers" :key="u.email" @click="form.email=u.email; form.password=u.pwd" class="text-left p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--color-50)] dark:hover:bg-[var(--color-900)]/20 transition-colors">
              <div class="text-xs font-medium text-[var(--text-primary)]">{{ u.role }}</div>
              <div class="text-xs text-[var(--text-secondary)] truncate">{{ u.email }}</div>
            </button>
          </div>
        </div>
      </div>

      <div class="text-center mt-4">
        <NuxtLink to="/" class="text-sm text-[var(--color-600)] dark:text-[var(--color-400)] hover:underline">← Back to Public Site</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
definePageMeta({ layout: false })
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const form = ref({ email: '', password: '' })
const loading = ref(false)
const error = ref('')
const showPwd = ref(false)

const demoUsers = [
  { role: 'State Admin', email: 'state.admin@bihar.gov.in', pwd: 'Bihar@2025' },
  { role: 'District Admin', email: 'patna.admin@bihar.gov.in', pwd: 'Bihar@2025' },
  { role: 'Block Admin', email: 'masaurhi.admin@bihar.gov.in', pwd: 'Bihar@2025' },
  { role: 'Citizen', email: 'citizen1@example.com', pwd: 'Test@123' },
]

async function login() {
  loading.value = true; error.value = ''
  try {
    const role = await authStore.login(form.value)
    const redirect = route.query.redirect
    if (redirect) router.push(String(redirect))
    else if (role === 'citizen') router.push('/citizen/dashboard')
    else router.push('/admin')
  } catch (e) { error.value = 'Invalid email or password. Please try again.' }
  finally { loading.value = false }
}
</script>
