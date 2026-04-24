<template>
  <AdminLayout>
    <div class="space-y-5">
      <h1 class="page-title">Panchayat Management</h1>
      <div class="card p-4">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <input v-model="search" class="input-field text-sm" placeholder="Search panchayat..." />
          <select v-model="districtFilter" class="select-field text-sm">
            <option value="">All Districts</option>
            <option v-for="d in districts" :key="d.code" :value="d.name">{{ d.name }}</option>
          </select>
          <select v-model="ratingFilter" class="select-field text-sm">
            <option value="">All Ratings</option>
            <option value="high">High (4+)</option>
            <option value="medium">Medium (3-4)</option>
            <option value="low">Low (&lt;3)</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="p in filtered" :key="p.id" class="card p-4 hover:border-[var(--color-400)] hover:shadow-md transition-all cursor-pointer" @click="selected=p">
          <div class="flex items-start justify-between mb-2">
            <div>
              <h3 class="font-bold text-[var(--text-primary)]">{{ p.name }}</h3>
              <p class="text-xs text-[var(--color-600)] dark:text-[var(--color-400)]">{{ p.name_hindi }}</p>
            </div>
            <div class="flex items-center gap-1 text-yellow-500">
              <span class="text-sm">★</span>
              <span class="text-sm font-bold text-[var(--text-primary)]">{{ p.rating.score }}</span>
            </div>
          </div>
          <p class="text-xs text-[var(--text-secondary)] mb-3">{{ p.block }}, {{ p.district }}</p>
          <div class="grid grid-cols-3 gap-2 text-center mb-3">
            <div class="bg-[var(--bg-secondary)] rounded-lg p-2">
              <div class="text-sm font-bold text-[var(--text-primary)]">{{ p.demographics.total_population.toLocaleString('en-IN') }}</div>
              <div class="text-xs text-[var(--text-secondary)]">Population</div>
            </div>
            <div class="bg-[var(--bg-secondary)] rounded-lg p-2">
              <div class="text-sm font-bold" :class="p.funds_summary.utilization_pct >= 80 ? 'text-green-600 dark:text-green-400' : p.funds_summary.utilization_pct >= 60 ? 'text-orange-500' : 'text-red-500'">{{ p.funds_summary.utilization_pct }}%</div>
              <div class="text-xs text-[var(--text-secondary)]">Fund Used</div>
            </div>
            <div class="bg-[var(--bg-secondary)] rounded-lg p-2">
              <div class="text-sm font-bold" :class="p.complaints.open > 5 ? 'text-red-500' : 'text-[var(--text-primary)]'">{{ p.complaints.open }}</div>
              <div class="text-xs text-[var(--text-secondary)]">Open Cases</div>
            </div>
          </div>
          <div class="flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span>Mukhiya: {{ p.elected_body.mukhiya.name }}</span>
            <span>{{ p.projects.completed }}/{{ p.projects.total }} projects</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Panchayat Detail Modal -->
    <div v-if="selected" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" @click.self="selected=null">
      <div class="bg-[var(--bg-card)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h2 class="text-2xl font-bold text-[var(--text-primary)]">{{ selected.name }} <span class="text-[var(--color-600)] dark:text-[var(--color-400)] text-lg">{{ selected.name_hindi }}</span></h2>
              <p class="text-[var(--text-secondary)] text-sm">{{ selected.block }}, {{ selected.district }}</p>
            </div>
            <button @click="selected=null" class="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="bg-[var(--bg-secondary)] rounded-xl p-3">
              <h4 class="font-semibold text-[var(--text-primary)] mb-2 text-sm">Demographics</h4>
              <div class="space-y-1 text-xs text-[var(--text-secondary)]">
                <div>Population: <span class="font-medium text-[var(--text-primary)]">{{ selected.demographics.total_population.toLocaleString('en-IN') }}</span></div>
                <div>Households: <span class="font-medium text-[var(--text-primary)]">{{ selected.demographics.total_households.toLocaleString('en-IN') }}</span></div>
                <div>BPL Families: <span class="font-medium text-[var(--text-primary)]">{{ selected.demographics.bpl_families }}</span></div>
                <div>Voters: <span class="font-medium text-[var(--text-primary)]">{{ selected.demographics.voters.toLocaleString('en-IN') }}</span></div>
              </div>
            </div>
            <div class="bg-[var(--bg-secondary)] rounded-xl p-3">
              <h4 class="font-semibold text-[var(--text-primary)] mb-2 text-sm">Administration</h4>
              <div class="space-y-1 text-xs text-[var(--text-secondary)]">
                <div>Mukhiya: <span class="font-medium text-[var(--text-primary)]">{{ selected.elected_body.mukhiya.name }}</span></div>
                <div>Sachiv: <span class="font-medium text-[var(--text-primary)]">{{ selected.administration.sachiv.name }}</span></div>
                <div>Ward Members: <span class="font-medium text-[var(--text-primary)]">{{ selected.elected_body.ward_members }}</span></div>
                <div>Last Ward Sabha: <span class="font-medium text-[var(--text-primary)]">{{ selected.last_ward_sabha }}</span></div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-3 mb-4">
            <div class="bg-[var(--bg-secondary)] rounded-xl p-3 text-center">
              <div class="text-xl font-bold" :class="selected.funds_summary.utilization_pct >= 80 ? 'text-green-600 dark:text-green-400' : 'text-orange-500'">{{ selected.funds_summary.utilization_pct }}%</div>
              <div class="text-xs text-[var(--text-secondary)]">Fund Utilization</div>
            </div>
            <div class="bg-[var(--bg-secondary)] rounded-xl p-3 text-center">
              <div class="text-xl font-bold text-[var(--text-primary)]">{{ selected.projects.completed }}/{{ selected.projects.total }}</div>
              <div class="text-xs text-[var(--text-secondary)]">Projects Done</div>
            </div>
            <div class="bg-[var(--bg-secondary)] rounded-xl p-3 text-center">
              <div class="text-xl font-bold" :class="selected.complaints.open > 5 ? 'text-red-500' : 'text-[var(--text-primary)]'">{{ selected.complaints.open }}</div>
              <div class="text-xs text-[var(--text-secondary)]">Open Complaints</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
const { data: panchayats } = await useFetch('/api/panchayats')
const { data: districts } = await useFetch('/api/districts')
const search = ref(''); const districtFilter = ref(''); const ratingFilter = ref(''); const selected = ref(null)
const filtered = computed(() => (panchayats.value || []).filter(p => {
  if (search.value && !p.name.toLowerCase().includes(search.value.toLowerCase())) return false
  if (districtFilter.value && p.district !== districtFilter.value) return false
  if (ratingFilter.value === 'high' && p.rating.score < 4) return false
  if (ratingFilter.value === 'medium' && (p.rating.score < 3 || p.rating.score >= 4)) return false
  if (ratingFilter.value === 'low' && p.rating.score >= 3) return false
  return true
}))
</script>
