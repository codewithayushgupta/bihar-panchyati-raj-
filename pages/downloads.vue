<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />
    <div class="max-w-7xl mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Downloads</h1>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="category in categories" :key="category.title" class="card p-6">
          <h2 class="text-xl font-semibold text-[var(--text-primary)] mb-4">{{ category.title }}</h2>
          <div class="space-y-2">
            <a v-for="file in category.files" :key="file" href="#" class="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded hover:bg-[var(--color-50)] dark:hover:bg-[var(--color-900)]/20 transition-colors">
              <span class="text-sm text-[var(--text-primary)]">{{ file }}</span>
              <svg class="w-4 h-4 text-[var(--color-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
const categories = [
  {
    title: 'Application Forms',
    files: ['Grievance Form', 'RTI Application', 'Scheme Application', 'NOC Request Form']
  },
  {
    title: 'Reports',
    files: ['Annual Report 2023-24', 'Quarterly Progress Report', 'Audit Report', 'Performance Report']
  },
  {
    title: 'Guidelines',
    files: ['Scheme Guidelines', 'Fund Utilization Guidelines', 'Procurement Guidelines', 'Audit Guidelines']
  },
  {
    title: 'Circulars & Orders',
    files: ['Latest Circulars', 'Government Orders', 'Office Memorandums', 'Notifications']
  }
]
</script>
