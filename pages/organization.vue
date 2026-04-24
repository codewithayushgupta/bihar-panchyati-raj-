<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />
    <div class="max-w-7xl mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Organizational Structure</h1>
      <div class="card p-6 space-y-6">
        <div v-for="level in structure" :key="level.title" class="border-b pb-4 last:border-b-0">
          <h2 class="text-xl font-semibold text-[var(--text-primary)] mb-2">{{ level.title }}</h2>
          <p class="text-[var(--text-secondary)] mb-3">{{ level.description }}</p>
          <div class="grid md:grid-cols-2 gap-3">
            <div v-for="role in level.roles" :key="role" class="bg-[var(--color-50)] dark:bg-[var(--color-900)]/20 p-3 rounded">
              <span class="text-sm text-[var(--text-primary)]">{{ role }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
const structure = [
  {
    title: 'State Level',
    description: 'Administrative headquarters and policy making body',
    roles: ['Principal Secretary', 'Secretary', 'Additional Secretary', 'Joint Secretary']
  },
  {
    title: 'District Level',
    description: 'District administration and coordination',
    roles: ['District Magistrate', 'District Panchayati Raj Officer', 'Zila Parishad CEO']
  },
  {
    title: 'Block Level',
    description: 'Block level implementation and monitoring',
    roles: ['Block Development Officer', 'Panchayat Samiti CEO', 'Extension Officers']
  },
  {
    title: 'Gram Panchayat Level',
    description: 'Village level governance',
    roles: ['Mukhiya', 'Sarpanch', 'Ward Members', 'Gram Panchayat Secretary']
  }
]
</script>
