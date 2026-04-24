<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />
    <div class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="page-title mb-2">Notices & Circulars</h1>
      <p class="text-[var(--text-secondary)] mb-6">Official notices from Panchayati Raj Department, Government of Bihar</p>
      <div class="space-y-4">
        <div v-for="n in notices" :key="n.id" class="card p-5 hover:border-[var(--color-400)] transition-colors">
          <div class="flex items-start gap-4">
            <div class="p-2.5 rounded-xl flex-shrink-0" :class="n.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-600' : n.priority === 'medium' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <div class="flex-1">
              <div class="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <h3 class="font-semibold text-[var(--text-primary)]">{{ n.title }}</h3>
                  <p class="text-sm text-[var(--color-600)] dark:text-[var(--color-400)] mt-0.5">{{ n.title_hindi }}</p>
                </div>
                <span class="px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0" :class="n.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'">{{ n.category }}</span>
              </div>
              <p class="text-sm text-[var(--text-secondary)] mt-2 line-clamp-2">{{ n.content }}</p>
              <div class="flex items-center gap-4 mt-3 text-xs text-[var(--text-secondary)]">
                <span>Issued by: {{ n.issued_by }}</span>
                <span>Date: {{ n.issued_date }}</span>
                <span>Valid till: {{ n.valid_till }}</span>
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
const { data: notices } = await useFetch('/api/notices')
</script>
