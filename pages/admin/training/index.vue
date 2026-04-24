<template>
  <AdminLayout>
    <div class="space-y-5">
      <h1 class="page-title">Training Management</h1>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Modules" :value="modules?.length || 0" color="blue"><template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg></template></StatCard>
        <StatCard label="Total Enrolled" :value="totalEnrolled.toLocaleString('en-IN')" color="green"><template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg></template></StatCard>
        <StatCard label="Completed" :value="totalCompleted.toLocaleString('en-IN')" color="orange"><template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg></template></StatCard>
        <StatCard label="Avg Completion" :value="avgCompletion + '%'" color="purple"><template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/></svg></template></StatCard>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div v-for="m in modules" :key="m.id" class="card p-5">
          <div class="flex items-start justify-between mb-3">
            <div>
              <div class="text-xs font-mono text-[var(--color-600)] dark:text-[var(--color-400)] mb-1">{{ m.id }}</div>
              <h3 class="font-semibold text-[var(--text-primary)]">{{ m.name }}</h3>
            </div>
            <span class="text-xs px-2 py-0.5 rounded-full" :class="m.mandatory ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'">{{ m.mandatory ? 'Mandatory' : 'Recommended' }}</span>
          </div>
          <div class="flex items-center gap-3 text-xs text-[var(--text-secondary)] mb-3">
            <span>{{ m.duration_hours }}h</span>
            <span>{{ m.modules }} modules</span>
            <span>{{ m.target_role.join(', ') }}</span>
          </div>
          <div class="flex items-center gap-2 mb-1">
            <div class="flex-1 h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
              <div class="h-full bg-[var(--color-600)] rounded-full" :style="{ width: Math.round(m.completed/m.enrolled*100) + '%' }"></div>
            </div>
            <span class="text-xs font-medium text-[var(--text-primary)]">{{ Math.round(m.completed/m.enrolled*100) }}%</span>
          </div>
          <div class="text-xs text-[var(--text-secondary)]">{{ m.completed.toLocaleString('en-IN') }} / {{ m.enrolled.toLocaleString('en-IN') }} completed</div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
const { data: modules } = await useFetch('/api/training')
const totalEnrolled = computed(() => (modules.value || []).reduce((s, m) => s + m.enrolled, 0))
const totalCompleted = computed(() => (modules.value || []).reduce((s, m) => s + m.completed, 0))
const avgCompletion = computed(() => modules.value?.length ? Math.round(totalCompleted.value / totalEnrolled.value * 100) : 0)
</script>
