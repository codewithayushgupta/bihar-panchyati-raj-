<template>
  <AdminLayout>
    <div class="space-y-5">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="page-title">Complaints Management</h1>
          <p class="text-[var(--text-secondary)] mt-1">{{ complaintsStore.all.length }} total complaints</p>
        </div>
        <button @click="complaintsStore.fetchAll()" class="btn-secondary text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          Refresh
        </button>
      </div>

      <!-- Filters -->
      <div class="card p-4">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
          <select v-model="complaintsStore.filters.status" class="select-field text-sm">
            <option value="">All Status</option>
            <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
          </select>
          <select v-model="complaintsStore.filters.category" class="select-field text-sm">
            <option value="">All Categories</option>
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
          <select v-model="complaintsStore.filters.district" class="select-field text-sm">
            <option value="">All Districts</option>
            <option v-for="d in districts" :key="d.code" :value="d.name">{{ d.name }}</option>
          </select>
          <select v-model="complaintsStore.filters.priority" class="select-field text-sm">
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <button @click="Object.keys(complaintsStore.filters).forEach(k => complaintsStore.filters[k] = null)" class="btn-secondary text-sm">Clear Filters</button>
        </div>
      </div>

      <!-- Table -->
      <div class="card p-5">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead><tr class="border-b border-[var(--border-color)]">
              <th class="text-left py-2 px-3 text-[var(--text-secondary)] font-medium">ID</th>
              <th class="text-left py-2 px-3 text-[var(--text-secondary)] font-medium">Category</th>
              <th class="text-left py-2 px-3 text-[var(--text-secondary)] font-medium">Location</th>
              <th class="text-center py-2 px-3 text-[var(--text-secondary)] font-medium">Priority</th>
              <th class="text-center py-2 px-3 text-[var(--text-secondary)] font-medium">Status</th>
              <th class="text-left py-2 px-3 text-[var(--text-secondary)] font-medium">Submitted</th>
              <th class="text-center py-2 px-3 text-[var(--text-secondary)] font-medium">Actions</th>
            </tr></thead>
            <tbody>
              <tr v-for="c in complaintsStore.filtered" :key="c.id" class="table-row" :class="c.is_escalated ? 'bg-red-50 dark:bg-red-900/10' : ''">
                <td class="py-2.5 px-3 font-mono text-xs text-[var(--text-primary)]">{{ c.id.split('/').pop() }}</td>
                <td class="py-2.5 px-3 font-medium text-[var(--text-primary)]">{{ c.category }}</td>
                <td class="py-2.5 px-3 text-[var(--text-secondary)]">{{ c.panchayat }}, {{ c.district }}</td>
                <td class="py-2.5 px-3 text-center"><span class="px-2 py-0.5 rounded-full text-xs font-medium capitalize" :class="priorityClass(c.priority)">{{ c.priority }}</span></td>
                <td class="py-2.5 px-3 text-center"><StatusBadge :status="c.status" /></td>
                <td class="py-2.5 px-3 text-[var(--text-secondary)]">{{ formatDate(c.submitted_at) }}</td>
                <td class="py-2.5 px-3 text-center">
                  <button @click="selected = c" class="text-[var(--color-600)] dark:text-[var(--color-400)] hover:underline text-xs">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <div v-if="selected" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" @click.self="selected=null">
      <div class="bg-[var(--bg-card)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <div class="font-mono text-sm text-[var(--text-secondary)]">{{ selected.id }}</div>
              <h2 class="text-xl font-bold text-[var(--text-primary)] mt-1">{{ selected.category }}</h2>
            </div>
            <button @click="selected=null" class="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div><span class="text-[var(--text-secondary)]">Location:</span> <span class="font-medium">{{ selected.panchayat }}, {{ selected.district }}</span></div>
            <div><span class="text-[var(--text-secondary)]">Priority:</span> <span class="font-medium capitalize">{{ selected.priority }}</span></div>
            <div><span class="text-[var(--text-secondary)]">Status:</span> <StatusBadge :status="selected.status" /></div>
            <div><span class="text-[var(--text-secondary)]">Submitted:</span> <span class="font-medium">{{ formatDate(selected.submitted_at) }}</span></div>
          </div>
          <div class="bg-[var(--bg-secondary)] rounded-lg p-3 mb-4 text-sm">{{ selected.description }}</div>
          <div class="space-y-2 mb-4">
            <div v-for="t in selected.timeline" :key="t.date" class="flex gap-2 text-xs">
              <StatusBadge :status="t.status" />
              <span class="text-[var(--text-secondary)]">{{ t.actor }} — {{ t.note }}</span>
            </div>
          </div>
          <div v-if="!['Resolved', 'Closed'].includes(selected.status)" class="flex gap-2">
            <button @click="updateStatus('In Progress')" class="btn-primary text-sm">Mark In Progress</button>
            <button @click="updateStatus('Resolved')" class="btn-orange text-sm">Mark Resolved</button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { useComplaintsStore } from '~/stores/complaints'
const complaintsStore = useComplaintsStore()
const { data: districts } = await useFetch('/api/districts')
const selected = ref(null)

const statuses = ['Submitted', 'Acknowledged', 'Under Review', 'Assigned', 'In Progress', 'Resolved', 'Closed', 'Escalated', 'Reopened']
const categories = ['Road & Infrastructure', 'Water Supply', 'Sanitation', 'Electricity', 'MGNREGS', 'Ration / PDS', 'Housing (PMAY)', 'Panchayat Administration', 'Certificate / Documents', 'Others']

function priorityClass(p) {
  return { critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', low: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' }[p]
}

async function updateStatus(status) {
  await complaintsStore.updateStatus(selected.value.id, status, `Status updated to ${status} by admin`, 'Admin')
  selected.value = null
}

function formatDate(d) { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) }

onMounted(() => complaintsStore.fetchAll())
</script>
