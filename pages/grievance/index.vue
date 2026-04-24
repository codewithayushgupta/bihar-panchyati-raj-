<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />
    <div class="max-w-3xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="page-title">शिकायत दर्ज करें</h1>
        <p class="text-[var(--text-secondary)] mt-1">File a Complaint — No login required</p>
      </div>

      <!-- Success State -->
      <div v-if="submitted" class="card p-8 text-center">
        <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h2 class="text-xl font-bold text-[var(--text-primary)] mb-2">Complaint Registered!</h2>
        <p class="text-[var(--text-secondary)] mb-4">Your complaint has been successfully registered.</p>
        <div class="bg-[var(--bg-secondary)] rounded-xl p-4 mb-6">
          <div class="text-xs text-[var(--text-secondary)] mb-1">Complaint ID</div>
          <div class="font-mono font-bold text-[var(--color-600)] dark:text-[var(--color-400)] text-lg">{{ result.id }}</div>
          <div class="text-xs text-[var(--text-secondary)] mt-3 mb-1">Tracking Token (save this!)</div>
          <div class="font-mono font-bold text-prd-orange-500 text-2xl tracking-widest">{{ result.token }}</div>
        </div>
        <p class="text-sm text-[var(--text-secondary)] mb-4">Use this token to track your complaint status at any time.</p>
        <div class="flex gap-3 justify-center">
          <NuxtLink to="/grievance/track" class="btn-primary">Track Complaint</NuxtLink>
          <button @click="submitted=false; form={}" class="btn-secondary">File Another</button>
        </div>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="submitComplaint" class="space-y-5">
        <!-- Location -->
        <div class="card p-5">
          <h3 class="section-title mb-4">Location Details</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="label-text">District *</label>
              <select v-model="form.district" @change="form.block=''; form.panchayat=''" class="select-field" required>
                <option value="">Select District</option>
                <option v-for="d in districts" :key="d.code" :value="d.name">{{ d.name }}</option>
              </select>
            </div>
            <div>
              <label class="label-text">Block *</label>
              <select v-model="form.block" @change="form.panchayat=''" class="select-field" required :disabled="!form.district">
                <option value="">Select Block</option>
                <option v-for="b in selectedBlocks" :key="b" :value="b">{{ b }}</option>
              </select>
            </div>
            <div>
              <label class="label-text">Panchayat *</label>
              <input v-model="form.panchayat" class="input-field" placeholder="Enter Panchayat name" required />
            </div>
          </div>
          <div class="mt-4">
            <label class="label-text">Ward Number</label>
            <input v-model="form.ward" class="input-field" placeholder="e.g. 5" type="number" min="1" max="20" />
          </div>
        </div>

        <!-- Complaint Details -->
        <div class="card p-5">
          <h3 class="section-title mb-4">Complaint Details</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="label-text">Category *</label>
              <select v-model="form.category" class="select-field" required>
                <option value="">Select Category</option>
                <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
            <div>
              <label class="label-text">Priority</label>
              <select v-model="form.priority" class="select-field">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
          <div>
            <label class="label-text">Description * (minimum 50 characters)</label>
            <textarea v-model="form.description" class="input-field min-h-[120px] resize-none" placeholder="Describe your complaint in detail..." required minlength="50"></textarea>
            <div class="text-xs text-[var(--text-secondary)] mt-1 text-right">{{ form.description?.length || 0 }} characters</div>
          </div>
        </div>

        <!-- Complainant Info -->
        <div class="card p-5">
          <h3 class="section-title mb-4">Your Information (Optional)</h3>
          <div class="flex items-center gap-2 mb-4">
            <input type="checkbox" v-model="form.is_anonymous" id="anon" class="w-4 h-4 accent-prd-amber-600" />
            <label for="anon" class="text-sm text-[var(--text-primary)]">Submit anonymously</label>
          </div>
          <div v-if="!form.is_anonymous" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="label-text">Name</label>
              <input v-model="form.name" class="input-field" placeholder="Your full name" />
            </div>
            <div>
              <label class="label-text">Phone Number</label>
              <input v-model="form.phone" class="input-field" placeholder="10-digit mobile number" type="tel" />
            </div>
          </div>
        </div>

        <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-400 text-sm">{{ error }}</div>

        <button type="submit" class="btn-primary w-full justify-center py-3" :disabled="loading">
          <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          {{ loading ? 'Submitting...' : 'Submit Complaint' }}
        </button>
      </form>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { useComplaintsStore } from '~/stores/complaints'
const store = useComplaintsStore()
const { data: districts } = await useFetch('/api/districts')

const form = ref({ district: '', block: '', panchayat: '', ward: '', category: '', priority: 'medium', description: '', is_anonymous: false, name: '', phone: '' })
const submitted = ref(false)
const loading = ref(false)
const error = ref('')
const result = ref({})

const categories = ['Road & Infrastructure', 'Water Supply', 'Sanitation', 'Electricity', 'MGNREGS', 'Ration / PDS', 'Housing (PMAY)', 'Panchayat Administration', 'Certificate / Documents', 'Others']
const selectedBlocks = computed(() => districts.value?.find(d => d.name === form.value.district)?.blocks || [])

async function submitComplaint() {
  if ((form.value.description?.length || 0) < 50) { error.value = 'Description must be at least 50 characters.'; return }
  loading.value = true; error.value = ''
  try {
    const res = await store.submit({
      category: form.value.category, district: form.value.district, block: form.value.block,
      panchayat: form.value.panchayat, ward: form.value.ward, description: form.value.description,
      priority: form.value.priority,
      complainant: { name: form.value.is_anonymous ? 'Anonymous' : form.value.name, phone: form.value.phone, is_anonymous: form.value.is_anonymous }
    })
    result.value = res
    submitted.value = true
  } catch (e) { error.value = 'Failed to submit. Please try again.' }
  finally { loading.value = false }
}
</script>
