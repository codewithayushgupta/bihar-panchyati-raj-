<template>
  <div class="card p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide">{{ label }}</p>
        <p class="text-2xl font-bold text-[var(--text-primary)] mt-1">{{ value }}</p>
        <p v-if="sub" class="text-xs text-[var(--text-secondary)] mt-0.5">{{ sub }}</p>
      </div>
      <div class="p-2.5 rounded-xl" :class="iconBg">
        <slot name="icon">
          <div class="w-6 h-6" />
        </slot>
      </div>
    </div>
    <div v-if="trend !== undefined" class="mt-3 flex items-center gap-1 text-xs">
      <span :class="trend >= 0 ? 'text-green-500' : 'text-red-500'">
        {{ trend >= 0 ? '↑' : '↓' }} {{ Math.abs(trend) }}%
      </span>
      <span class="text-[var(--text-secondary)]">vs last month</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  label: String, value: [String, Number], sub: String,
  trend: Number, color: { type: String, default: 'green' }
})
const iconBg = computed(() => ({
  green: 'bg-prd-amber-100 dark:bg-prd-amber-900 text-prd-amber-600 dark:text-prd-amber-400',
  orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
}[props.color]))
</script>
