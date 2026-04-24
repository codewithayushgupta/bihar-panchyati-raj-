<template>
  <NuxtLink :to="to" @click="$emit('click')" class="block px-3 py-2 rounded-lg text-sm font-medium text-prd-amber-100 hover:bg-prd-amber-600 hover:text-white transition-colors">{{ label }}</NuxtLink>
</template>
<script setup>
defineProps({ to: String, label: String })
defineEmits(['click'])
</script>
