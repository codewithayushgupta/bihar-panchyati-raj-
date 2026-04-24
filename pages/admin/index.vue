<template>
  <AdminLayout>
    <div class="space-y-6">
      <div>
        <h1 class="page-title">Dashboard</h1>
        <p class="text-[var(--text-secondary)] mt-1">Welcome back, {{ authStore.user?.name }}</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open Complaints" :value="complaintsStore.openCount" sub="Requires attention" color="red">
          <template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg></template>
        </StatCard>
        <StatCard label="Escalated" :value="complaintsStore.escalatedCount" sub="SLA breached" color="orange">
          <template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg></template>
        </StatCard>
        <StatCard label="Active Projects" :value="activeProjects" sub="Across jurisdiction" color="blue">
          <template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></template>
        </StatCard>
        <StatCard label="Fund Utilization" value="82.4%" sub="FY 2024-25" color="green" :trend="4.2">
          <template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></template>
        </StatCard>
      </div>

      <!-- Recent Complaints + Fund Overview -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Complaints -->
        <div class="card p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="section-title">Recent Complaints</h3>
            <NuxtLink to="/admin/complaints" class="text-[var(--color-600)] dark:text-[var(--color-400)] text-sm hover:underline">View All</NuxtLink>
          </div>
          <div class="space-y-3">
            <div v-for="c in recentComplaints" :key="c.id" class="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer" @click="navigateTo('/admin/complaints')">
              <div class="w-2 h-2 rounded-full mt-2 flex-shrink-0" :class="c.is_escalated ? 'bg-red-500' : c.priority === 'high' ? 'bg-orange-500' : 'bg-blue-500'"></div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-[var(--text-primary)] truncate">{{ c.category }} — {{ c.panchayat }}</div>
                <div class="text-xs text-[var(--text-secondary)]">{{ c.district }} · {{ formatDate(c.submitted_at) }}</div>
              </div>
              <StatusBadge :status="c.status" />
            </div>
          </div>
        </div>

        <!-- Fund Utilization Rings -->
        <div class="card p-5">
          <h3 class="section-title mb-4">Fund Utilization by Scheme</h3>
          <div class="grid grid-cols-3 gap-4">
            <div v-for="f in fundRings" :key="f.label" class="flex flex-col items-center">
              <ProgressRing :percent="f.pct" :size="80" :color="f.color" />
              <div class="text-xs text-center text-[var(--text-secondary)] mt-2">{{ f.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Projects Status -->
      <div class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="section-title">Recent Projects</h3>
          <NuxtLink to="/admin/projects" class="text-[var(--color-600)] dark:text-[var(--color-400)] text-sm hover:underline">View All</NuxtLink>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead><tr class="border-b border-[var(--border-color)]">
              <th class="text-left py-2 px-3 text-[var(--text-secondary)] font-medium">Project</th>
              <th class="text-left py-2 px-3 text-[var(--text-secondary)] font-medium">District</th>
              <th class="text-right py-2 px-3 text-[var(--text-secondary)] font-medium">Budget</th>
              <th class="text-center py-2 px-3 text-[var(--text-secondary)] font-medium">Progress</th>
              <th class="text-center py-2 px-3 text-[var(--text-secondary)] font-medium">Status</th>
            </tr></thead>
            <tbody>
              <tr v-for="p in projects" :key="p.id" class="table-row">
                <td class="py-2.5 px-3 font-medium text-[var(--text-primary)]">{{ p.name }}</td>
                <td class="py-2.5 px-3 text-[var(--text-secondary)]">{{ p.district }}</td>
                <td class="py-2.5 px-3 text-right text-[var(--text-primary)]">₹{{ p.budget_lakhs }} L</td>
                <td class="py-2.5 px-3">
                  <div class="flex items-center gap-2">
                    <div class="flex-1 h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                      <div class="h-full bg-[var(--color-600)] rounded-full" :style="{ width: p.progress_pct + '%' }"></div>
                    </div>
                    <span class="text-xs text-[var(--text-secondary)] w-8">{{ p.progress_pct }}%</span>
                  </div>
                </td>
                <td class="py-2.5 px-3 text-center"><StatusBadge :status="p.status" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { useComplaintsStore } from '~/stores/complaints'
const authStore = useAuthStore()
const complaintsStore = useComplaintsStore()
const { data: projects } = await useFetch('/api/projects')
onMounted(() => complaintsStore.fetchAll())

const recentComplaints = computed(() => complaintsStore.all.slice(0, 5))
const activeProjects = computed(() => (projects.value || []).filter(p => p.status === 'Ongoing' || p.status === 'In Progress').length)

const fundRings = [
  { label: 'MGNREGS', pct: 91, color: '#1A6B3C' },
  { label: 'PMAY-G', pct: 84, color: '#2E9B5F' },
  { label: 'JJM', pct: 78, color: '#E07B00' },
  { label: '15th FC', pct: 82, color: '#56AD7A' },
  { label: 'SBM-G', pct: 71, color: '#F5A623' },
  { label: 'SFC', pct: 68, color: '#7CBF96' },
]

function formatDate(d) { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) }
</script>
