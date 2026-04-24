<template>
  <AdminLayout>
    <div class="space-y-5">
      <h1 class="page-title">MIS — Officer Monitoring</h1>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Officers" :value="officers?.length || 0" color="blue"><template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg></template></StatCard>
        <StatCard label="Avg Resolution Rate" :value="avgResolution + '%'" color="green"><template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></template></StatCard>
        <StatCard label="SLA Breaches" :value="totalBreaches" color="red"><template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg></template></StatCard>
        <StatCard label="Active Today" :value="activeToday" color="orange"><template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"/></svg></template></StatCard>
      </div>

      <div class="card p-5">
        <h3 class="section-title mb-4">Officer Leaderboard</h3>
        <div class="space-y-3">
          <div v-for="(o, i) in sortedOfficers" :key="o.id" class="flex items-center gap-4 p-3 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer" @click="selected=o">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" :class="i === 0 ? 'bg-yellow-400 text-yellow-900' : i === 1 ? 'bg-gray-300 text-gray-700' : i === 2 ? 'bg-orange-400 text-orange-900' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'">{{ i + 1 }}</div>
            <div class="flex-1 min-w-0">
              <div class="font-medium text-[var(--text-primary)]">{{ o.name }}</div>
              <div class="text-xs text-[var(--text-secondary)]">{{ o.designation }} — {{ o.jurisdiction.district }}</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-bold" :class="o.stats.resolution_rate >= 90 ? 'text-green-600 dark:text-green-400' : o.stats.resolution_rate >= 70 ? 'text-orange-500' : 'text-red-500'">{{ o.stats.resolution_rate }}%</div>
              <div class="text-xs text-[var(--text-secondary)]">resolution</div>
            </div>
            <div class="text-right hidden md:block">
              <div class="text-sm font-medium text-[var(--text-primary)]">{{ o.stats.complaints_resolved }}/{{ o.stats.complaints_assigned }}</div>
              <div class="text-xs text-[var(--text-secondary)]">resolved</div>
            </div>
            <div class="text-right hidden md:block">
              <div class="text-sm font-medium" :class="o.stats.sla_breaches > 3 ? 'text-red-500' : 'text-[var(--text-primary)]'">{{ o.stats.sla_breaches }}</div>
              <div class="text-xs text-[var(--text-secondary)]">SLA breaches</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Officer Detail Modal -->
    <div v-if="selected" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" @click.self="selected=null">
      <div class="bg-[var(--bg-card)] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h2 class="text-xl font-bold text-[var(--text-primary)]">{{ selected.name }}</h2>
              <p class="text-[var(--text-secondary)] text-sm">{{ selected.designation }} — {{ selected.jurisdiction.district }}</p>
            </div>
            <button @click="selected=null" class="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
          </div>
          <div class="grid grid-cols-2 gap-3 mb-4">
            <div class="bg-[var(--bg-secondary)] rounded-xl p-3 text-center">
              <div class="text-2xl font-bold text-[var(--color-600)] dark:text-[var(--color-400)]">{{ selected.stats.resolution_rate }}%</div>
              <div class="text-xs text-[var(--text-secondary)]">Resolution Rate</div>
            </div>
            <div class="bg-[var(--bg-secondary)] rounded-xl p-3 text-center">
              <div class="text-2xl font-bold text-[var(--text-primary)]">{{ selected.stats.avg_resolution_days }}</div>
              <div class="text-xs text-[var(--text-secondary)]">Avg Days to Resolve</div>
            </div>
            <div class="bg-[var(--bg-secondary)] rounded-xl p-3 text-center">
              <div class="text-2xl font-bold text-[var(--text-primary)]">{{ selected.stats.login_days_last_30 }}/30</div>
              <div class="text-xs text-[var(--text-secondary)]">Login Days (30d)</div>
            </div>
            <div class="bg-[var(--bg-secondary)] rounded-xl p-3 text-center">
              <div class="text-2xl font-bold" :class="selected.stats.sla_breaches > 3 ? 'text-red-500' : 'text-[var(--text-primary)]'">{{ selected.stats.sla_breaches }}</div>
              <div class="text-xs text-[var(--text-secondary)]">SLA Breaches</div>
            </div>
          </div>
          <h4 class="font-semibold text-[var(--text-primary)] mb-2">Recent Activity</h4>
          <div class="space-y-2">
            <div v-for="a in selected.activity_log" :key="a.date+a.action" class="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <span class="text-xs bg-[var(--bg-secondary)] px-2 py-0.5 rounded">{{ a.date }}</span>
              <span class="capitalize">{{ a.action.replace(/_/g, ' ') }}</span>
              <span v-if="a.ref" class="font-mono text-xs text-[var(--color-600)] dark:text-[var(--color-400)]">{{ a.ref }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
const { data: officers } = await useFetch('/api/mis/officers')
const selected = ref(null)
const sortedOfficers = computed(() => [...(officers.value || [])].sort((a, b) => b.stats.resolution_rate - a.stats.resolution_rate))
const avgResolution = computed(() => officers.value?.length ? Math.round(officers.value.reduce((s, o) => s + o.stats.resolution_rate, 0) / officers.value.length) : 0)
const totalBreaches = computed(() => (officers.value || []).reduce((s, o) => s + o.stats.sla_breaches, 0))
const activeToday = computed(() => (officers.value || []).filter(o => o.activity_log.some(a => a.date === '2025-04-08' || a.date === '2025-04-09')).length)
</script>
