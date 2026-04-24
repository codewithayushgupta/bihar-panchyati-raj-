<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />
    <div class="max-w-7xl mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Acts & Rules</h1>
      <div class="space-y-4">
        <div v-for="doc in documents" :key="doc.title" class="card p-6 hover:border-[var(--color-400)] transition-colors">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h2 class="text-lg font-semibold text-[var(--text-primary)] mb-2">{{ doc.title }}</h2>
              <p class="text-sm text-[var(--text-secondary)] mb-3">{{ doc.description }}</p>
              <div class="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <span>{{ doc.year }}</span>
                <span>•</span>
                <span>{{ doc.size }}</span>
              </div>
            </div>
            <button class="btn-primary text-sm">
              <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
const documents = [
  {
    title: 'The Constitution (73rd Amendment) Act, 1992',
    description: 'Constitutional provisions for Panchayati Raj Institutions',
    year: '1992',
    size: '2.4 MB'
  },
  {
    title: 'Bihar Panchayat Raj Act, 2006',
    description: 'State legislation for Panchayati Raj system in Bihar',
    year: '2006',
    size: '3.8 MB'
  },
  {
    title: 'Bihar Panchayat Raj Rules, 2007',
    description: 'Detailed rules and procedures for Panchayat administration',
    year: '2007',
    size: '4.2 MB'
  },
  {
    title: 'Bihar Panchayat Account Code',
    description: 'Financial management and accounting guidelines',
    year: '2008',
    size: '1.9 MB'
  },
  {
    title: 'Model Panchayat Bye-Laws',
    description: 'Standard bye-laws for Gram Panchayats',
    year: '2010',
    size: '1.2 MB'
  },
  {
    title: 'Right to Information Act, 2005',
    description: 'RTI Act applicable to Panchayati Raj Institutions',
    year: '2005',
    size: '856 KB'
  }
]
</script>
