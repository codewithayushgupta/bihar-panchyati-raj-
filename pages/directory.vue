<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />
    <div class="max-w-5xl mx-auto px-4 py-8">
      <h1 class="page-title mb-2">PRD Directory</h1>
      <p class="text-[var(--text-secondary)] mb-6">Contact information for Panchayati Raj Department officials</p>
      <div class="space-y-4">
        <div v-for="o in officers" :key="o.id" class="card p-5">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-[var(--color-100)] dark:bg-[var(--color-900)]/30 flex items-center justify-center text-[var(--color-600)] dark:text-[var(--color-400)] font-bold text-lg flex-shrink-0">{{ o.name.charAt(0) }}</div>
            <div class="flex-1">
              <h3 class="font-bold text-[var(--text-primary)]">{{ o.name }}</h3>
              <p class="text-sm text-[var(--color-600)] dark:text-[var(--color-400)]">{{ o.designation }}</p>
              <p class="text-xs text-[var(--text-secondary)] mt-1">{{ o.department }} — {{ o.jurisdiction.district }}{{ o.jurisdiction.block ? ', ' + o.jurisdiction.block : '' }}</p>
              <div class="flex items-center gap-4 mt-2 text-xs text-[var(--text-secondary)]">
                <span>📞 {{ o.contact.phone }}</span>
                <span>✉ {{ o.contact.email }}</span>
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
const { data: officers } = await useFetch('/api/mis/officers')
</script>
