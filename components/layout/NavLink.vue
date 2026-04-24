<template>
  <NuxtLink :to="to" class="px-3 py-2 rounded-lg text-sm font-medium transition-colors" :class="isActive ? 'bg-prd-amber-600 text-white' : 'text-prd-amber-100 hover:bg-prd-amber-600 hover:text-white'">
    {{ label }}
  </NuxtLink>
</template>
<script setup>
const props = defineProps({ to: String, label: String })
const route = useRoute()
const isActive = computed(() => route.path === props.to || (props.to !== '/' && route.path.startsWith(props.to)))
</script>
