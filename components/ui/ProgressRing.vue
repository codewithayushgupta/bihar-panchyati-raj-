<template>
  <div class="flex flex-col items-center gap-1">
    <svg :width="size" :height="size" class="-rotate-90">
      <circle :cx="size/2" :cy="size/2" :r="radius" fill="none" stroke="currentColor" class="text-[var(--border-color)]" :stroke-width="stroke" />
      <circle :cx="size/2" :cy="size/2" :r="radius" fill="none" :stroke="color" :stroke-width="stroke"
        :stroke-dasharray="circumference" :stroke-dashoffset="offset" stroke-linecap="round" class="transition-all duration-700" />
    </svg>
    <div class="text-center -mt-1">
      <div class="text-lg font-bold text-[var(--text-primary)]">{{ percent }}%</div>
      <div v-if="label" class="text-xs text-[var(--text-secondary)]">{{ label }}</div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  percent: { type: Number, default: 0 },
  size: { type: Number, default: 80 },
  stroke: { type: Number, default: 8 },
  color: { type: String, default: '#1A6B3C' },
  label: String
})
const radius = computed(() => (props.size - props.stroke) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const offset = computed(() => circumference.value - (props.percent / 100) * circumference.value)
</script>
