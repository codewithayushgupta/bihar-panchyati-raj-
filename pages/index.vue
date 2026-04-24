<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />

    <!-- Hero -->
    <section class="bg-gradient-to-br from-prd-amber-700 via-prd-amber-600 to-prd-amber-800 dark:from-prd-amber-900 dark:via-prd-amber-800 dark:to-prd-amber-900 text-white py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col lg:flex-row items-center gap-10">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--color-700)] font-bold">PRD</div>
              <div>
                <div class="text-[var(--color-200)] text-sm">Government of Bihar</div>
                <div class="font-bold text-lg">Panchayati Raj Department</div>
              </div>
            </div>
            <h1 class="text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Unified Digital<br><span class="text-prd-orange-400">Governance Platform</span>
            </h1>
            <p class="text-[var(--color-100)] text-lg mb-8 max-w-xl">Transparent, accountable, and citizen-centric governance for 8,400+ Gram Panchayats across Bihar.</p>
            <div class="flex flex-wrap gap-3">
              <NuxtLink to="/grievance" class="btn-orange">File a Complaint</NuxtLink>
              <NuxtLink to="/grievance/track" class="btn-secondary border-white text-white hover:bg-white/10">Track Complaint</NuxtLink>
              <NuxtLink to="/map" class="btn-secondary border-white text-white hover:bg-white/10">Explore GIS Map</NuxtLink>
            </div>
          </div>
          <!-- Stats Grid -->
          <div class="grid grid-cols-2 gap-4 w-full lg:w-auto">
            <div v-for="s in heroStats" :key="s.label" class="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-white">{{ s.value }}</div>
              <div class="text-[var(--color-200)] text-xs mt-1">{{ s.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Actions -->
    <section class="max-w-7xl mx-auto px-4 py-10">
      <h2 class="section-title mb-6">Citizen Services</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <QuickAction v-for="a in quickActions" :key="a.label" v-bind="a" />
      </div>
    </section>

    <!-- Live Stats -->
    <section class="bg-[var(--bg-secondary)] py-10 px-4">
      <div class="max-w-7xl mx-auto">
        <h2 class="section-title mb-6">Platform Overview — FY 2024-25</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Panchayats" value="8,471" sub="Across 38 districts" color="green">
            <template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg></template>
          </StatCard>
          <StatCard label="Funds Utilized" value="₹18,420 Cr" sub="82.4% utilization rate" color="orange" :trend="4.2">
            <template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></template>
          </StatCard>
          <StatCard label="Complaints Resolved" value="1,24,312" sub="89.2% resolution rate" color="blue" :trend="2.1">
            <template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></template>
          </StatCard>
          <StatCard label="Projects Completed" value="42,891" sub="Out of 58,234 total" color="purple" :trend="6.8">
            <template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg></template>
          </StatCard>
        </div>
      </div>
    </section>

    <!-- Recent Notices -->
    <section class="max-w-7xl mx-auto px-4 py-10">
      <div class="flex items-center justify-between mb-6">
        <h2 class="section-title">Recent Notices</h2>
        <NuxtLink to="/notices" class="text-[var(--color-600)] dark:text-[var(--color-400)] text-sm hover:underline">View All →</NuxtLink>
      </div>
      <div class="space-y-3">
        <div v-for="n in notices" :key="n.id" class="card p-4 flex items-start gap-4 hover:border-[var(--color-400)] transition-colors cursor-pointer">
          <div class="p-2 rounded-lg" :class="n.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-600' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-medium text-[var(--text-primary)] text-sm">{{ n.title }}</div>
            <div class="text-xs text-[var(--text-secondary)] mt-0.5">{{ n.title_hindi }}</div>
            <div class="text-xs text-[var(--text-secondary)] mt-1">{{ n.issued_by }} · {{ n.issued_date }}</div>
          </div>
          <StatusBadge :status="n.priority === 'high' ? 'Escalated' : 'Submitted'" />
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
const { data: notices } = await useFetch('/api/notices')

const heroStats = [
  { value: '38', label: 'Districts' },
  { value: '534', label: 'Blocks' },
  { value: '8,471', label: 'Panchayats' },
  { value: '4', label: 'User Roles' },
]

const quickActions = [
  { label: 'File Complaint', icon: 'complaint', to: '/grievance', color: 'orange' },
  { label: 'Track Complaint', icon: 'track', to: '/grievance/track', color: 'blue' },
  { label: 'View Schemes', icon: 'scheme', to: '/schemes', color: 'green' },
  { label: 'GIS Map', icon: 'map', to: '/map', color: 'teal' },
  { label: 'Fund Data', icon: 'fund', to: '/dashboard', color: 'purple' },
  { label: 'Notices', icon: 'notice', to: '/notices', color: 'red' },
]
</script>
