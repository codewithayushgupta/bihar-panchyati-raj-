<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />

    <div v-if="panchayat" class="max-w-5xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="card p-6 mb-6">
        <div class="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div class="text-xs text-[var(--text-secondary)] mb-1 font-mono">{{ panchayat.id }}</div>
            <h1 class="text-3xl font-bold text-[var(--text-primary)]">{{ panchayat.name }}
              <span class="text-prd-green-600 dark:text-prd-green-400 text-xl ml-2">{{ panchayat.name_hindi }}</span>
            </h1>
            <p class="text-[var(--text-secondary)] mt-1">{{ panchayat.block }} Block · {{ panchayat.district }} District · {{ panchayat.sub_division }}</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-xl">
              <span class="text-yellow-500 text-xl">★</span>
              <span class="text-xl font-bold text-[var(--text-primary)]">{{ panchayat.rating.score }}</span>
              <span class="text-xs text-[var(--text-secondary)] ml-1">({{ panchayat.rating.total_ratings }} ratings)</span>
            </div>
          </div>
        </div>

        <!-- Key Stats Row -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div class="bg-[var(--bg-secondary)] rounded-xl p-3 text-center">
            <div class="text-xl font-bold text-[var(--text-primary)]">{{ panchayat.demographics.total_population.toLocaleString('en-IN') }}</div>
            <div class="text-xs text-[var(--text-secondary)]">Population</div>
          </div>
          <div class="bg-[var(--bg-secondary)] rounded-xl p-3 text-center">
            <div class="text-xl font-bold" :class="panchayat.funds_summary.utilization_pct >= 80 ? 'text-green-600 dark:text-green-400' : panchayat.funds_summary.utilization_pct >= 60 ? 'text-orange-500' : 'text-red-500'">{{ panchayat.funds_summary.utilization_pct }}%</div>
            <div class="text-xs text-[var(--text-secondary)]">Fund Utilization</div>
          </div>
          <div class="bg-[var(--bg-secondary)] rounded-xl p-3 text-center">
            <div class="text-xl font-bold text-[var(--text-primary)]">{{ panchayat.projects.completed }}/{{ panchayat.projects.total }}</div>
            <div class="text-xs text-[var(--text-secondary)]">Projects Done</div>
          </div>
          <div class="bg-[var(--bg-secondary)] rounded-xl p-3 text-center">
            <div class="text-xl font-bold" :class="panchayat.complaints.open > 5 ? 'text-red-500' : 'text-[var(--text-primary)]'">{{ panchayat.complaints.open }}</div>
            <div class="text-xs text-[var(--text-secondary)]">Open Complaints</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Demographics -->
        <div class="card p-5">
          <h2 class="section-title mb-4">Demographics</h2>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between"><span class="text-[var(--text-secondary)]">Total Population</span><span class="font-medium">{{ panchayat.demographics.total_population.toLocaleString('en-IN') }}</span></div>
            <div class="flex justify-between"><span class="text-[var(--text-secondary)]">Male / Female</span><span class="font-medium">{{ panchayat.demographics.male.toLocaleString('en-IN') }} / {{ panchayat.demographics.female.toLocaleString('en-IN') }}</span></div>
            <div class="flex justify-between"><span class="text-[var(--text-secondary)]">SC Population</span><span class="font-medium">{{ panchayat.demographics.sc_population.toLocaleString('en-IN') }}</span></div>
            <div class="flex justify-between"><span class="text-[var(--text-secondary)]">ST Population</span><span class="font-medium">{{ panchayat.demographics.st_population.toLocaleString('en-IN') }}</span></div>
            <div class="flex justify-between"><span class="text-[var(--text-secondary)]">BPL Families</span><span class="font-medium">{{ panchayat.demographics.bpl_families }}</span></div>
            <div class="flex justify-between"><span class="text-[var(--text-secondary)]">Total Households</span><span class="font-medium">{{ panchayat.demographics.total_households.toLocaleString('en-IN') }}</span></div>
            <div class="flex justify-between"><span class="text-[var(--text-secondary)]">Registered Voters</span><span class="font-medium">{{ panchayat.demographics.voters.toLocaleString('en-IN') }}</span></div>
          </div>
        </div>

        <!-- Administration -->
        <div class="card p-5">
          <h2 class="section-title mb-4">Administration</h2>
          <div class="space-y-4">
            <div class="flex items-center gap-3 p-3 bg-[var(--bg-secondary)] rounded-xl">
              <div class="w-10 h-10 rounded-full bg-prd-green-100 dark:bg-prd-green-900/30 flex items-center justify-center text-prd-green-600 dark:text-prd-green-400 font-bold">{{ panchayat.elected_body.mukhiya.name.charAt(0) }}</div>
              <div>
                <div class="font-semibold text-[var(--text-primary)]">{{ panchayat.elected_body.mukhiya.name }}</div>
                <div class="text-xs text-prd-green-600 dark:text-prd-green-400">Mukhiya · Elected {{ panchayat.elected_body.mukhiya.elected_year }}</div>
              </div>
            </div>
            <div class="flex items-center gap-3 p-3 bg-[var(--bg-secondary)] rounded-xl">
              <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold">{{ panchayat.administration.sachiv.name.charAt(0) }}</div>
              <div>
                <div class="font-semibold text-[var(--text-primary)]">{{ panchayat.administration.sachiv.name }}</div>
                <div class="text-xs text-blue-600 dark:text-blue-400">Panchayat Sachiv · {{ panchayat.administration.sachiv.employee_id }}</div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div><span class="text-[var(--text-secondary)]">Ward Members:</span> <span class="font-medium">{{ panchayat.elected_body.ward_members }}</span></div>
              <div><span class="text-[var(--text-secondary)]">Rojgar Sevak:</span> <span class="font-medium">{{ panchayat.administration.rojgar_sevak }}</span></div>
              <div class="col-span-2"><span class="text-[var(--text-secondary)]">Last Ward Sabha:</span> <span class="font-medium">{{ panchayat.last_ward_sabha }}</span></div>
            </div>
          </div>
        </div>

        <!-- Fund Summary -->
        <div class="card p-5">
          <h2 class="section-title mb-4">Fund Summary — FY {{ panchayat.financial_year }}</h2>
          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-[var(--text-secondary)]">Utilization</span>
                <span class="font-bold" :class="panchayat.funds_summary.utilization_pct >= 80 ? 'text-green-600 dark:text-green-400' : 'text-orange-500'">{{ panchayat.funds_summary.utilization_pct }}%</span>
              </div>
              <div class="h-3 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-700" :style="{ width: panchayat.funds_summary.utilization_pct + '%', backgroundColor: panchayat.funds_summary.utilization_pct >= 80 ? '#1A6B3C' : '#E07B00' }"></div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 text-sm mt-3">
              <div class="text-center">
                <div class="font-bold text-[var(--text-primary)]">₹{{ (panchayat.funds_summary.total_allocated / 100000).toFixed(1) }} L</div>
                <div class="text-xs text-[var(--text-secondary)]">Allocated</div>
              </div>
              <div class="text-center">
                <div class="font-bold text-[var(--text-primary)]">₹{{ (panchayat.funds_summary.total_released / 100000).toFixed(1) }} L</div>
                <div class="text-xs text-[var(--text-secondary)]">Released</div>
              </div>
              <div class="text-center">
                <div class="font-bold text-prd-green-600 dark:text-prd-green-400">₹{{ (panchayat.funds_summary.total_utilized / 100000).toFixed(1) }} L</div>
                <div class="text-xs text-[var(--text-secondary)]">Utilized</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Infrastructure -->
        <div class="card p-5">
          <h2 class="section-title mb-4">Infrastructure</h2>
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div class="flex items-center gap-2">
              <span :class="panchayat.infrastructure.panchayat_bhawan ? 'text-green-500' : 'text-red-500'">{{ panchayat.infrastructure.panchayat_bhawan ? '✓' : '✗' }}</span>
              <span class="text-[var(--text-secondary)]">Panchayat Bhawan</span>
              <span class="text-xs text-[var(--text-secondary)]">({{ panchayat.infrastructure.panchayat_bhawan_condition }})</span>
            </div>
            <div><span class="text-[var(--text-secondary)]">Schools:</span> <span class="font-medium">{{ panchayat.infrastructure.schools }}</span></div>
            <div><span class="text-[var(--text-secondary)]">Anganwadi:</span> <span class="font-medium">{{ panchayat.infrastructure.anganwadi_centers }}</span></div>
            <div><span class="text-[var(--text-secondary)]">Health Sub-Centers:</span> <span class="font-medium">{{ panchayat.infrastructure.health_sub_centers }}</span></div>
            <div><span class="text-[var(--text-secondary)]">Total Roads:</span> <span class="font-medium">{{ panchayat.infrastructure.total_roads_km }} km</span></div>
            <div><span class="text-[var(--text-secondary)]">Paved Roads:</span> <span class="font-medium">{{ panchayat.infrastructure.paved_roads_km }} km</span></div>
          </div>
          <div class="mt-4 space-y-2">
            <div>
              <div class="flex justify-between text-xs mb-1"><span class="text-[var(--text-secondary)]">Piped Water Coverage</span><span class="font-medium">{{ panchayat.infrastructure.piped_water_coverage_pct }}%</span></div>
              <div class="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden"><div class="h-full bg-blue-500 rounded-full" :style="{ width: panchayat.infrastructure.piped_water_coverage_pct + '%' }"></div></div>
            </div>
            <div>
              <div class="flex justify-between text-xs mb-1"><span class="text-[var(--text-secondary)]">Toilet Coverage</span><span class="font-medium">{{ panchayat.infrastructure.toilet_coverage_pct }}%</span></div>
              <div class="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden"><div class="h-full bg-prd-green-600 rounded-full" :style="{ width: panchayat.infrastructure.toilet_coverage_pct + '%' }"></div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Projects & Complaints Summary -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div class="card p-5">
          <h2 class="section-title mb-4">Projects Status</h2>
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ panchayat.projects.completed }}</div>
              <div class="text-xs text-[var(--text-secondary)]">Completed</div>
            </div>
            <div class="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 text-center">
              <div class="text-2xl font-bold text-orange-500">{{ panchayat.projects.ongoing }}</div>
              <div class="text-xs text-[var(--text-secondary)]">Ongoing</div>
            </div>
            <div class="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 text-center">
              <div class="text-2xl font-bold text-red-500">{{ panchayat.projects.not_started }}</div>
              <div class="text-xs text-[var(--text-secondary)]">Not Started</div>
            </div>
            <div class="bg-[var(--bg-secondary)] rounded-xl p-3 text-center">
              <div class="text-2xl font-bold text-[var(--text-primary)]">{{ panchayat.projects.total }}</div>
              <div class="text-xs text-[var(--text-secondary)]">Total</div>
            </div>
          </div>
        </div>

        <div class="card p-5">
          <h2 class="section-title mb-4">Complaints Summary</h2>
          <div class="grid grid-cols-3 gap-3">
            <div class="bg-[var(--bg-secondary)] rounded-xl p-3 text-center">
              <div class="text-2xl font-bold text-[var(--text-primary)]">{{ panchayat.complaints.total }}</div>
              <div class="text-xs text-[var(--text-secondary)]">Total Filed</div>
            </div>
            <div class="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 text-center">
              <div class="text-2xl font-bold text-red-500">{{ panchayat.complaints.open }}</div>
              <div class="text-xs text-[var(--text-secondary)]">Open</div>
            </div>
            <div class="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ panchayat.complaints.resolved }}</div>
              <div class="text-xs text-[var(--text-secondary)]">Resolved</div>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex justify-between text-xs mb-1"><span class="text-[var(--text-secondary)]">Resolution Rate</span><span class="font-medium">{{ panchayat.complaints.total > 0 ? Math.round(panchayat.complaints.resolved / panchayat.complaints.total * 100) : 0 }}%</span></div>
            <div class="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
              <div class="h-full bg-prd-green-600 rounded-full" :style="{ width: (panchayat.complaints.total > 0 ? Math.round(panchayat.complaints.resolved / panchayat.complaints.total * 100) : 0) + '%' }"></div>
            </div>
          </div>
          <NuxtLink to="/grievance" class="btn-primary mt-4 text-sm w-full justify-center">File a Complaint</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="max-w-xl mx-auto px-4 py-20 text-center">
      <div class="text-6xl mb-4">🏘️</div>
      <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-2">Panchayat Not Found</h2>
      <p class="text-[var(--text-secondary)] mb-6">No panchayat found with this ID.</p>
      <NuxtLink to="/map" class="btn-primary">Explore GIS Map</NuxtLink>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
const route = useRoute()
const { data: panchayats } = await useFetch('/api/panchayats')
const panchayat = computed(() => (panchayats.value || []).find(p => p.id === route.params.id))

useHead(() => ({
  title: panchayat.value ? `${panchayat.value.name} — Bihar PRD` : 'Panchayat — Bihar PRD'
}))
</script>
