<template>
  <NuxtLink :to="to" class="card p-4 flex flex-col items-center gap-2 hover:border-prd-amber-400 hover:shadow-md transition-all text-center group">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center transition-colors" :class="bgClass">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path v-if="icon==='complaint'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        <path v-else-if="icon==='track'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        <path v-else-if="icon==='scheme'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        <path v-else-if="icon==='map'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
        <path v-else-if="icon==='fund'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
      </svg>
    </div>
    <span class="text-xs font-medium text-[var(--text-primary)] group-hover:text-prd-amber-600 dark:group-hover:text-prd-amber-400 transition-colors">{{ label }}</span>
  </NuxtLink>
</template>
<script setup>
const props = defineProps({ label: String, icon: String, to: String, color: String })
const bgClass = computed(() => ({
  orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  green: 'bg-prd-amber-100 dark:bg-prd-amber-900/30 text-prd-amber-600 dark:text-prd-amber-400',
  teal: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
}[props.color] || 'bg-gray-100 dark:bg-gray-800 text-gray-600'))
</script>
