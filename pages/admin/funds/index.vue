<template>
  <AdminLayout>
    <div class="space-y-5">
      <h1 class="page-title">Fund Management</h1>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Allocated" value="₹25,600 Cr" color="green">
          <template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg></template>
        </StatCard>
        <StatCard label="Released" value="₹22,840 Cr" color="blue">
          <template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg></template>
        </StatCard>
        <StatCard label="Utilized" value="₹18,420 Cr" color="orange" :trend="4.2">
          <template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></template>
        </StatCard>
        <StatCard label="Utilization Rate" value="80.6%" color="purple">
          <template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg></template>
        </StatCard>
      </div>

      <div class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="section-title">Panchayat Fund Details</h3>
          <input v-model="search" class="input-field w-48 text-sm" placeholder="Search..." />
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead><tr class="border-b border-[var(--border-color)]">
              <th class="text-left py-2 px-3 text-[var(--text-secondary)] font-medium">Panchayat</th>
              <th class="text-left py-2 px-3 text-[var(--text-secondary)] font-medium">District</th>
              <th class="text-right py-2 px-3 text-[var(--text-secondary)] font-medium">Allocated</th>
              <th class="text-right py-2 px-3 text-[var(--text-secondary)] font-medium">Utilized</th>
              <th class="text-center py-2 px-3 text-[var(--text-secondary)] font-medium">Utilization %</th>
              <th class="text-left py-2 px-3 text-[var(--text-secondary)] font-medium">Schemes</th>
            </tr></thead>
            <tbody>
              <tr v-for="f in filtered" :key="f.panchayat_id" class="table-row cursor-pointer" @click="selected=f">
                <td class="py-2.5 px-3 font-medium text-[var(--text-primary)]">{{ f.panchayat_name }}</td>
                <td class="py-2.5 px-3 text-[var(--text-secondary)]">{{ f.district }}</td>
                <td class="py-2.5 px-3 text-right">₹{{ (f.total_allocated/100000).toFixed(1) }} L</td>
                <td class="py-2.5 px-3 text-right">₹{{ (f.total_utilized/100000).toFixed(1) }} L</td>
                <td class="py-2.5 px-3">
                  <div class="flex items-center gap-2">
                    <div class="flex-1 h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                      <div class="h-full rounded-full" :style="{ width: f.overall_utilization_pct + '%', backgroundColor: f.overall_utilization_pct >= 80 ? '#1A6B3C' : f.overall_utilization_pct >= 60 ? '#E07B00' : '#dc2626' }"></div>
                    </div>
                    <span class="text-xs font-medium w-10 text-right" :class="f.overall_utilization_pct >= 80 ? 'text-green-600 dark:text-green-400' : f.overall_utilization_pct >= 60 ? 'text-orange-500' : 'text-red-500'">{{ f.overall_utilization_pct }}%</span>
                  </div>
                </td>
                <td class="py-2.5 px-3 text-[var(--text-secondary)]">{{ f.funds.length }} schemes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Fund Detail Modal -->
    <div v-if="selected" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" @click.self="selected=null">
      <div class="bg-[var(--bg-card)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-[var(--text-primary)]">{{ selected.panchayat_name }} — Fund Details</h2>
            <button @click="selected=null" class="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="space-y-3">
            <div v-for="fund in selected.funds" :key="fund.scheme" class="bg-[var(--bg-secondary)] rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold text-[var(--text-primary)]">{{ fund.scheme }}</span>
                <span class="text-xs px-2 py-0.5 bg-[var(--color-100)] dark:bg-[var(--color-900)]/30 text-[var(--color-700)] dark:text-[var(--color-400)] rounded-full">{{ fund.category }}</span>
              </div>
              <div class="grid grid-cols-3 gap-2 text-sm mb-2">
                <div><div class="text-xs text-[var(--text-secondary)]">Allocated</div><div class="font-medium">₹{{ (fund.allocated/100000).toFixed(1) }} L</div></div>
                <div><div class="text-xs text-[var(--text-secondary)]">Released</div><div class="font-medium">₹{{ (fund.released/100000).toFixed(1) }} L</div></div>
                <div><div class="text-xs text-[var(--text-secondary)]">Utilized</div><div class="font-medium text-[var(--color-600)] dark:text-[var(--color-400)]">₹{{ (fund.utilized/100000).toFixed(1) }} L</div></div>
              </div>
              <div class="h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
                <div class="h-full bg-[var(--color-600)] rounded-full" :style="{ width: fund.utilization_pct + '%' }"></div>
              </div>
              <div class="text-xs text-right text-[var(--text-secondary)] mt-1">{{ fund.utilization_pct }}% utilized</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
const { data: funds } = await useFetch('/api/funds')
const search = ref('')
const selected = ref(null)
const filtered = computed(() => (funds.value || []).filter(f => f.panchayat_name.toLowerCase().includes(search.value.toLowerCase())))
</script>
