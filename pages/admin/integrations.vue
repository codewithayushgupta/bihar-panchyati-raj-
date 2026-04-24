<template>
  <AdminLayout>
    <div class="space-y-5">
      <h1 class="page-title">API Integration Status</h1>
      <div class="grid grid-cols-3 gap-4">
        <StatCard label="Connected" :value="connected" color="green"><template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></template></StatCard>
        <StatCard label="Degraded" :value="degraded" color="orange"><template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg></template></StatCard>
        <StatCard label="Disconnected" :value="disconnected" color="red"><template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3"/></svg></template></StatCard>
      </div>
      <div class="space-y-4">
        <div v-for="i in integrations" :key="i.id" class="card p-5">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="i.status === 'connected' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : i.status === 'degraded' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
              </div>
              <div>
                <h3 class="font-bold text-[var(--text-primary)]">{{ i.name }}</h3>
                <p class="text-xs text-[var(--text-secondary)]">{{ i.description }}</p>
              </div>
            </div>
            <StatusBadge :status="i.status" />
          </div>
          <div v-if="i.error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2 text-xs text-red-700 dark:text-red-400 mb-3">⚠ {{ i.error }}</div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-[var(--text-secondary)]">
            <div v-if="i.last_sync"><span class="font-medium text-[var(--text-primary)]">Last Sync:</span> {{ new Date(i.last_sync).toLocaleString('en-IN') }}</div>
            <div v-if="i.records_synced !== undefined"><span class="font-medium text-[var(--text-primary)]">Records:</span> {{ i.records_synced.toLocaleString('en-IN') }}</div>
            <div v-if="i.sync_frequency"><span class="font-medium text-[var(--text-primary)]">Frequency:</span> {{ i.sync_frequency }}</div>
            <div v-if="i.data_types"><span class="font-medium text-[var(--text-primary)]">Data:</span> {{ i.data_types.join(', ') }}</div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
const { data: integrations } = await useFetch('/api/integrations')
const connected = computed(() => (integrations.value || []).filter(i => i.status === 'connected').length)
const degraded = computed(() => (integrations.value || []).filter(i => i.status === 'degraded').length)
const disconnected = computed(() => (integrations.value || []).filter(i => i.status === 'disconnected').length)
</script>
