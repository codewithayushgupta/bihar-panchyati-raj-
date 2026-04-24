<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="page-title">Fund Transparency Dashboard</h1>
          <p class="text-[var(--text-secondary)] mt-1">FY 2024-25 — Public Data</p>
        </div>
        <div class="text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] px-3 py-1.5 rounded-full">Last updated: 10 April 2025</div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Allocated" value="₹25,600 Cr" sub="All schemes combined" color="green">
          <template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg></template>
        </StatCard>
        <StatCard label="Total Released" value="₹22,840 Cr" sub="89.2% of allocated" color="blue">
          <template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg></template>
        </StatCard>
        <StatCard label="Total Utilized" value="₹18,420 Cr" sub="80.6% utilization" color="orange" :trend="4.2">
          <template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></template>
        </StatCard>
        <StatCard label="Pending Utilization" value="₹4,420 Cr" sub="19.4% unspent" color="red">
          <template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></template>
        </StatCard>
      </div>

      <!-- Scheme Breakdown -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="card p-5">
          <h3 class="section-title mb-4">Scheme-wise Fund Utilization</h3>
          <div class="space-y-3">
            <div v-for="s in schemeData" :key="s.name">
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium text-[var(--text-primary)]">{{ s.name }}</span>
                <span class="text-[var(--text-secondary)]">{{ s.pct }}%</span>
              </div>
              <div class="h-2.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-700" :style="{ width: s.pct + '%', backgroundColor: s.color }"></div>
              </div>
              <div class="flex justify-between text-xs text-[var(--text-secondary)] mt-0.5">
                <span>₹{{ s.utilized }} Cr utilized</span>
                <span>of ₹{{ s.allocated }} Cr</span>
              </div>
            </div>
          </div>
        </div>

        <!-- District Comparison -->
        <div class="card p-5">
          <h3 class="section-title mb-4">District-wise Utilization</h3>
          <div class="space-y-2">
            <div v-for="d in districtData" :key="d.name" class="flex items-center gap-3">
              <div class="w-24 text-xs text-[var(--text-secondary)] text-right flex-shrink-0">{{ d.name }}</div>
              <div class="flex-1 h-6 bg-[var(--bg-secondary)] rounded overflow-hidden">
                <div class="h-full flex items-center px-2 text-xs text-white font-medium rounded transition-all duration-700"
                  :style="{ width: d.pct + '%', backgroundColor: d.pct >= 80 ? '#1A6B3C' : d.pct >= 60 ? '#E07B00' : '#dc2626' }">
                  {{ d.pct }}%
                </div>
              </div>
              <div class="text-xs text-[var(--text-secondary)] w-16 flex-shrink-0">₹{{ d.amount }} Cr</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Panchayat Fund Table -->
      <div class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="section-title">Panchayat Fund Details</h3>
          <input v-model="search" class="input-field w-48 text-sm" placeholder="Search panchayat..." />
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-[var(--border-color)]">
                <th class="text-left py-2 px-3 text-[var(--text-secondary)] font-medium">Panchayat</th>
                <th class="text-left py-2 px-3 text-[var(--text-secondary)] font-medium">District</th>
                <th class="text-right py-2 px-3 text-[var(--text-secondary)] font-medium">Allocated</th>
                <th class="text-right py-2 px-3 text-[var(--text-secondary)] font-medium">Utilized</th>
                <th class="text-center py-2 px-3 text-[var(--text-secondary)] font-medium">Utilization</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="f in filteredFunds" :key="f.panchayat_id" class="table-row">
                <td class="py-2.5 px-3 font-medium text-[var(--text-primary)]">{{ f.panchayat_name }}</td>
                <td class="py-2.5 px-3 text-[var(--text-secondary)]">{{ f.district }}</td>
                <td class="py-2.5 px-3 text-right text-[var(--text-primary)]">₹{{ (f.total_allocated/100000).toFixed(1) }} L</td>
                <td class="py-2.5 px-3 text-right text-[var(--text-primary)]">₹{{ (f.total_utilized/100000).toFixed(1) }} L</td>
                <td class="py-2.5 px-3">
                  <div class="flex items-center gap-2">
                    <div class="flex-1 h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                      <div class="h-full rounded-full" :style="{ width: f.overall_utilization_pct + '%', backgroundColor: f.overall_utilization_pct >= 80 ? '#1A6B3C' : f.overall_utilization_pct >= 60 ? '#E07B00' : '#dc2626' }"></div>
                    </div>
                    <span class="text-xs font-medium w-10 text-right" :class="f.overall_utilization_pct >= 80 ? 'text-green-600 dark:text-green-400' : f.overall_utilization_pct >= 60 ? 'text-orange-500' : 'text-red-500'">{{ f.overall_utilization_pct }}%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
const { data: funds } = await useFetch('/api/funds')
const search = ref('')
const filteredFunds = computed(() => (funds.value || []).filter(f => f.panchayat_name.toLowerCase().includes(search.value.toLowerCase())))

const schemeData = [
  { name: 'MGNREGS', pct: 91, allocated: 8400, utilized: 7644, color: '#1A6B3C' },
  { name: 'PMAY-G', pct: 84, allocated: 4800, utilized: 4032, color: '#2E9B5F' },
  { name: 'Jal Jeevan Mission', pct: 78, allocated: 6200, utilized: 4836, color: '#E07B00' },
  { name: '15th Finance Commission', pct: 82, allocated: 3200, utilized: 2624, color: '#56AD7A' },
  { name: 'SBM-G', pct: 71, allocated: 1200, utilized: 852, color: '#F5A623' },
  { name: 'State Finance Commission', pct: 68, allocated: 1800, utilized: 1224, color: '#7CBF96' },
]

const districtData = [
  { name: 'Gaya', pct: 94, amount: 2840 },
  { name: 'Patna', pct: 88, amount: 4120 },
  { name: 'Nalanda', pct: 85, amount: 1980 },
  { name: 'Darbhanga', pct: 82, amount: 2340 },
  { name: 'Saran', pct: 79, amount: 2100 },
  { name: 'Muzaffarpur', pct: 74, amount: 2890 },
  { name: 'Vaishali', pct: 61, amount: 1760 },
  { name: 'Bhagalpur', pct: 54, amount: 1640 },
]
</script>
