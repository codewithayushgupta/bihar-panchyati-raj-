<template>
  <nav class="flex items-center gap-1.5 text-sm">
    <NuxtLink to="/admin" class="text-[var(--text-secondary)] hover:text-[var(--color-600)] dark:hover:text-[var(--color-400)]">Admin</NuxtLink>
    <template v-for="(crumb, i) in crumbs" :key="i">
      <span class="text-[var(--border-color)]">/</span>
      <span :class="i === crumbs.length - 1 ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)] hover:text-[var(--color-600)] dark:hover:text-[var(--color-400)] cursor-pointer'">{{ crumb }}</span>
    </template>
  </nav>
</template>
<script setup>
const route = useRoute()
const crumbs = computed(() => {
  const parts = route.path.replace('/admin', '').split('/').filter(Boolean)
  return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' '))
})
</script>
