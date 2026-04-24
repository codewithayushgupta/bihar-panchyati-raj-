<template>
  <div :class="{ dark: isDark }">
    <NuxtPage />
  </div>
</template>

<script setup>
const isDark = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('theme')
  isDark.value = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
})

provide('toggleDark', () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
})
provide('isDark', isDark)
</script>
