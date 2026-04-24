<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />

    <!-- Header -->
    <section class="bg-gradient-to-br from-prd-amber-700 to-prd-amber-800 text-white py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-2">Tenders & Procurement</h1>
        <p class="text-[var(--color-200)]">Active tenders, bid documents, and procurement notices</p>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 py-10">
      <!-- Filter Tabs -->
      <div class="flex gap-2 mb-6 flex-wrap">
        <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
          class="px-4 py-2 rounded-full text-sm transition-colors"
          :class="activeTab === tab ? 'bg-[var(--color-600)] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--color-100)] dark:hover:bg-[var(--color-900)]/20'">
          {{ tab }}
        </button>
      </div>

      <!-- Tenders List -->
      <div class="space-y-4">
        <div v-for="tender in filteredTenders" :key="tender.id" class="card p-6 hover:border-[var(--color-400)] transition-colors">
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2 py-0.5 text-xs rounded-full"
                  :class="tender.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : tender.status === 'Upcoming' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'">
                  {{ tender.status }}
                </span>
                <span class="text-xs text-[var(--text-secondary)]">Tender No: {{ tender.no }}</span>
              </div>
              <h3 class="text-lg font-semibold text-[var(--text-primary)] mb-1">{{ tender.title }}</h3>
              <p class="text-sm text-[var(--text-secondary)] mb-3">{{ tender.description }}</p>
              <div class="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
                <span><strong class="text-[var(--text-primary)]">Value:</strong> {{ tender.value }}</span>
                <span><strong class="text-[var(--text-primary)]">Category:</strong> {{ tender.category }}</span>
                <span><strong class="text-[var(--text-primary)]">Last Date:</strong> {{ tender.lastDate }}</span>
                <span><strong class="text-[var(--text-primary)]">Opening:</strong> {{ tender.openDate }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-2 min-w-fit">
              <button class="btn-secondary text-sm">View Details</button>
              <button class="btn-primary text-sm">Download Bid Doc</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Corrigendum Section -->
      <div class="mt-10">
        <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-4">Corrigendum / Addendum</h2>
        <div class="space-y-3">
          <div v-for="item in corrigendum" :key="item.id" class="card p-4 flex items-center justify-between">
            <div>
              <p class="font-medium text-[var(--text-primary)] text-sm">{{ item.title }}</p>
              <p class="text-xs text-[var(--text-secondary)]">Ref: {{ item.ref }} · Published: {{ item.date }}</p>
            </div>
            <button class="btn-secondary text-xs">Download</button>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
const tabs = ['All', 'Active', 'Upcoming', 'Closed']
const activeTab = ref('All')

const tenders = [
  {
    id: 1,
    no: 'PRD/TND/2024/001',
    title: 'Construction of Panchayat Bhawan',
    description: 'Construction of 50 Gram Panchayat Bhawans across 10 districts',
    value: '₹45.20 Cr',
    category: 'Civil Works',
    lastDate: '25 Jan 2025',
    openDate: '27 Jan 2025',
    status: 'Active'
  },
  {
    id: 2,
    no: 'PRD/TND/2024/002',
    title: 'Supply of IT Equipment',
    description: 'Supply and installation of computers, printers for Panchayat offices',
    value: '₹8.50 Cr',
    category: 'IT Procurement',
    lastDate: '30 Jan 2025',
    openDate: '01 Feb 2025',
    status: 'Active'
  },
  {
    id: 3,
    no: 'PRD/TND/2024/003',
    title: 'Rural Road Construction - Phase III',
    description: 'Construction of 200 km rural roads under PMGSY',
    value: '₹120.00 Cr',
    category: 'Infrastructure',
    lastDate: '15 Feb 2025',
    openDate: '17 Feb 2025',
    status: 'Upcoming'
  },
  {
    id: 4,
    no: 'PRD/TND/2024/004',
    title: 'Water Supply Scheme',
    description: 'Installation of water supply infrastructure in 100 villages',
    value: '₹35.80 Cr',
    category: 'Water & Sanitation',
    lastDate: '20 Feb 2025',
    openDate: '22 Feb 2025',
    status: 'Upcoming'
  },
  {
    id: 5,
    no: 'PRD/TND/2023/015',
    title: 'Solar Street Lights Installation',
    description: 'Installation of solar street lights in 500 Gram Panchayats',
    value: '₹22.40 Cr',
    category: 'Energy',
    lastDate: '10 Dec 2024',
    openDate: '12 Dec 2024',
    status: 'Closed'
  }
]

const filteredTenders = computed(() =>
  activeTab.value === 'All' ? tenders : tenders.filter(t => t.status === activeTab.value)
)

const corrigendum = [
  { id: 1, title: 'Corrigendum to PRD/TND/2024/001 - Extension of last date', ref: 'PRD/TND/2024/001', date: '10 Jan 2025' },
  { id: 2, title: 'Addendum to PRD/TND/2024/002 - Technical specifications updated', ref: 'PRD/TND/2024/002', date: '12 Jan 2025' }
]
</script>
