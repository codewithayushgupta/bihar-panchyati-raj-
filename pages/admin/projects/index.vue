<template>
  <AdminLayout>
    <div class="space-y-5">
      <h1 class="page-title">Projects & Works</h1>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Projects" :value="projects?.length || 0" color="blue"><template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg></template></StatCard>
        <StatCard label="Completed" :value="completed" color="green"><template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></template></StatCard>
        <StatCard label="Ongoing" :value="ongoing" color="orange"><template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></template></StatCard>
        <StatCard label="Not Started" :value="notStarted" color="red"><template #icon><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></template></StatCard>
      </div>
      <div class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="section-title">All Projects</h3>
          <select v-model="statusFilter" class="select-field w-40 text-sm">
            <option value="">All Status</option>
            <option>Completed</option><option>Ongoing</option><option>In Progress</option><option>Not Started</option>
          </select>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead><tr class="border-b border-[var(--border-color)]">
              <th class="text-left py-2 px-3 text-[var(--text-secondary)] font-medium">Project Name</th>
              <th class="text-left py-2 px-3 text-[var(--text-secondary)] font-medium">Type</th>
              <th class="text-left py-2 px-3 text-[var(--text-secondary)] font-medium">District</th>
              <th class="text-right py-2 px-3 text-[var(--text-secondary)] font-medium">Budget</th>
              <th class="text-center py-2 px-3 text-[var(--text-secondary)] font-medium">Progress</th>
              <th class="text-center py-2 px-3 text-[var(--text-secondary)] font-medium">Status</th>
            </tr></thead>
            <tbody>
              <tr v-for="p in filtered" :key="p.id" class="table-row">
                <td class="py-2.5 px-3 font-medium text-[var(--text-primary)]">{{ p.name }}</td>
                <td class="py-2.5 px-3 text-[var(--text-secondary)]">{{ p.type }}</td>
                <td class="py-2.5 px-3 text-[var(--text-secondary)]">{{ p.district }}</td>
                <td class="py-2.5 px-3 text-right">₹{{ p.budget_lakhs }} L</td>
                <td class="py-2.5 px-3">
                  <div class="flex items-center gap-2">
                    <div class="flex-1 h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                      <div class="h-full bg-[var(--color-600)] rounded-full" :style="{ width: p.progress_pct + '%' }"></div>
                    </div>
                    <span class="text-xs text-[var(--text-secondary)] w-8">{{ p.progress_pct }}%</span>
                  </div>
                </td>
                <td class="py-2.5 px-3 text-center"><StatusBadge :status="p.status" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
const { data: projects } = await useFetch('/api/projects')
const statusFilter = ref('')
const filtered = computed(() => (projects.value || []).filter(p => !statusFilter.value || p.status === statusFilter.value))
const completed = computed(() => (projects.value || []).filter(p => p.status === 'Completed').length)
const ongoing = computed(() => (projects.value || []).filter(p => ['Ongoing', 'In Progress'].includes(p.status)).length)
const notStarted = computed(() => (projects.value || []).filter(p => p.status === 'Not Started').length)
</script>
