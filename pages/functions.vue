<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />
    <div class="max-w-7xl mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Functions & Responsibilities</h1>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="func in functions" :key="func.title" class="card p-6">
          <div class="flex items-start gap-3">
            <div class="p-2 bg-[var(--color-100)] dark:bg-[var(--color-900)]/30 rounded-lg text-[var(--color-600)]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-semibold text-[var(--text-primary)] mb-2">{{ func.title }}</h2>
              <ul class="text-sm text-[var(--text-secondary)] space-y-1">
                <li v-for="item in func.items" :key="item">• {{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
const functions = [
  {
    title: 'Rural Development',
    items: ['Infrastructure development', 'Road construction', 'Water supply', 'Sanitation']
  },
  {
    title: 'Social Welfare',
    items: ['Education programs', 'Healthcare services', 'Women empowerment', 'Child welfare']
  },
  {
    title: 'Agriculture & Allied',
    items: ['Agricultural extension', 'Animal husbandry', 'Fisheries', 'Minor irrigation']
  },
  {
    title: 'Financial Management',
    items: ['Budget preparation', 'Fund allocation', 'Audit compliance', 'Revenue collection']
  },
  {
    title: 'Planning & Monitoring',
    items: ['Development planning', 'Project monitoring', 'Performance evaluation', 'MIS management']
  },
  {
    title: 'Capacity Building',
    items: ['Training programs', 'Skill development', 'Awareness campaigns', 'Documentation']
  }
]
</script>
