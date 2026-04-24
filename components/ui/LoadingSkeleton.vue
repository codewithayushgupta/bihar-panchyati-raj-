<template>
  <div class="animate-pulse">
    <div v-if="type === 'card'" class="card p-5 space-y-3">
      <div class="h-4 bg-[var(--border-color)] rounded w-1/3"></div>
      <div class="h-8 bg-[var(--border-color)] rounded w-1/2"></div>
      <div class="h-3 bg-[var(--border-color)] rounded w-2/3"></div>
    </div>
    <div v-else-if="type === 'table'" class="space-y-2">
      <div v-for="i in 5" :key="i" class="h-12 bg-[var(--border-color)] rounded"></div>
    </div>
    <div v-else class="space-y-3">
      <div class="h-4 bg-[var(--border-color)] rounded"></div>
      <div class="h-4 bg-[var(--border-color)] rounded w-5/6"></div>
      <div class="h-4 bg-[var(--border-color)] rounded w-4/6"></div>
    </div>
  </div>
</template>
<script setup>
defineProps({ type: { type: String, default: 'default' } })
</script>
