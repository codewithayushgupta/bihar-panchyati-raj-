<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />
    <div class="max-w-7xl mx-auto px-4 py-8">
      <h1 class="page-title mb-2">Government Schemes</h1>
      <p class="text-[var(--text-secondary)] mb-6">Central and State schemes for rural development in Bihar</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="s in schemes" :key="s.id" class="card p-5 hover:border-[var(--color-400)] hover:shadow-md transition-all cursor-pointer" @click="selected = s">
          <div class="flex items-start justify-between mb-3">
            <div class="p-2 bg-[var(--color-100)] dark:bg-[var(--color-900)]/30 rounded-lg">
              <svg class="w-6 h-6 text-[var(--color-600)] dark:text-[var(--color-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <StatusBadge :status="s.status" />
          </div>
          <h3 class="font-bold text-[var(--text-primary)] mb-1">{{ s.name }}</h3>
          <p class="text-xs text-[var(--color-600)] dark:text-[var(--color-400)] mb-2">{{ s.full_name }}</p>
          <p class="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">{{ s.description }}</p>
          <div class="flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span>{{ s.type }}</span>
            <span>₹{{ s.budget_crore.toLocaleString('en-IN') }} Cr budget</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scheme Detail Modal -->
    <div v-if="selected" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" @click.self="selected=null">
      <div class="bg-[var(--bg-card)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h2 class="text-2xl font-bold text-[var(--text-primary)]">{{ selected.name }}</h2>
              <p class="text-[var(--color-600)] dark:text-[var(--color-400)] text-sm mt-1">{{ selected.full_name }}</p>
            </div>
            <button @click="selected=null" class="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <p class="text-[var(--text-secondary)] mb-5">{{ selected.description }}</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <h4 class="font-semibold text-[var(--text-primary)] mb-2">Benefits</h4>
              <ul class="space-y-1">
                <li v-for="b in selected.benefits" :key="b" class="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <span class="text-[var(--color-600)] mt-0.5">✓</span> {{ b }}
                </li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-[var(--text-primary)] mb-2">Eligibility</h4>
              <ul class="space-y-1">
                <li v-for="e in selected.eligibility" :key="e" class="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <span class="text-blue-500 mt-0.5">•</span> {{ e }}
                </li>
              </ul>
            </div>
          </div>
          <div class="bg-[var(--bg-secondary)] rounded-xl p-4 mb-4">
            <h4 class="font-semibold text-[var(--text-primary)] mb-2">How to Apply</h4>
            <p class="text-sm text-[var(--text-secondary)]">{{ selected.application_process }}</p>
          </div>
          <div class="flex items-center justify-between text-sm text-[var(--text-secondary)]">
            <span>Contact: {{ selected.contact }}</span>
            <span>Budget: ₹{{ selected.budget_crore.toLocaleString('en-IN') }} Cr</span>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>
<script setup>
const { data: schemes } = await useFetch('/api/schemes')
const selected = ref(null)
</script>
