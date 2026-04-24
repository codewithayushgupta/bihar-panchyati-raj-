<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />
    <div class="max-w-7xl mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Government Schemes</h1>
      <div class="space-y-4">
        <div v-for="scheme in schemes" :key="scheme.name" class="card p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h2 class="text-xl font-semibold text-[var(--text-primary)] mb-2">{{ scheme.name }}</h2>
              <p class="text-[var(--text-secondary)] mb-3">{{ scheme.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-[var(--color-100)] dark:bg-[var(--color-900)]/30 text-[var(--color-700)] dark:text-[var(--color-300)] text-xs rounded-full">{{ scheme.category }}</span>
                <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">Budget: {{ scheme.budget }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
const schemes = [
  {
    name: 'MGNREGA',
    description: 'Mahatma Gandhi National Rural Employment Guarantee Act - Provides 100 days of guaranteed wage employment',
    category: 'Employment',
    budget: '₹5,200 Cr'
  },
  {
    name: 'Pradhan Mantri Awas Yojana - Gramin',
    description: 'Housing for all in rural areas with financial assistance for construction',
    category: 'Housing',
    budget: '₹2,800 Cr'
  },
  {
    name: 'Swachh Bharat Mission - Gramin',
    description: 'Sanitation and hygiene program for rural areas',
    category: 'Sanitation',
    budget: '₹1,200 Cr'
  },
  {
    name: 'Pradhan Mantri Gram Sadak Yojana',
    description: 'Rural road connectivity program',
    category: 'Infrastructure',
    budget: '₹3,500 Cr'
  },
  {
    name: 'National Social Assistance Programme',
    description: 'Social security for elderly, widows, and disabled persons',
    category: 'Social Welfare',
    budget: '₹1,800 Cr'
  }
]
</script>
