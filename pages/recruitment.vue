<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />

    <!-- Header -->
    <section class="bg-gradient-to-br from-prd-amber-700 to-prd-amber-800 text-white py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-2">Recruitment</h1>
        <p class="text-[var(--color-200)]">Current job openings and recruitment notifications</p>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 py-10">
      <!-- Active Recruitments -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-[var(--text-primary)]">Active Recruitments</h2>
        <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-full">{{ active.length }} Open</span>
      </div>

      <div class="space-y-4 mb-10">
        <div v-for="job in active" :key="job.id" class="card p-6 hover:border-[var(--color-400)] transition-colors">
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">Active</span>
                <span class="text-xs text-[var(--text-secondary)]">Advt. No: {{ job.advt }}</span>
              </div>
              <h3 class="text-lg font-semibold text-[var(--text-primary)] mb-1">{{ job.title }}</h3>
              <p class="text-sm text-[var(--text-secondary)] mb-3">{{ job.department }}</p>
              <div class="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
                <span><strong class="text-[var(--text-primary)]">Posts:</strong> {{ job.posts }}</span>
                <span><strong class="text-[var(--text-primary)]">Pay Scale:</strong> {{ job.pay }}</span>
                <span><strong class="text-[var(--text-primary)]">Last Date:</strong> {{ job.lastDate }}</span>
              </div>
            </div>
            <div class="flex gap-2">
              <button class="btn-secondary text-sm">Notification</button>
              <button class="btn-primary text-sm">Apply Online</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Closed Recruitments -->
      <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-4">Closed Recruitments</h2>
      <div class="space-y-3">
        <div v-for="job in closed" :key="job.id" class="card p-4 opacity-70">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium text-[var(--text-primary)]">{{ job.title }}</h3>
              <p class="text-sm text-[var(--text-secondary)]">{{ job.department }} · {{ job.posts }} Posts · Closed: {{ job.lastDate }}</p>
            </div>
            <span class="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full">Closed</span>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
const active = [
  {
    id: 1,
    advt: 'PRD/2024/01',
    title: 'Panchayat Secretary',
    department: 'Panchayati Raj Department, Bihar',
    posts: '2,500',
    pay: '₹25,500 - ₹81,100',
    lastDate: '30 Jan 2025'
  },
  {
    id: 2,
    advt: 'PRD/2024/02',
    title: 'Block Development Officer',
    department: 'Panchayati Raj Department, Bihar',
    posts: '150',
    pay: '₹44,900 - ₹1,42,400',
    lastDate: '15 Feb 2025'
  },
  {
    id: 3,
    advt: 'PRD/2024/03',
    title: 'Junior Engineer (Civil)',
    department: 'Panchayati Raj Department, Bihar',
    posts: '320',
    pay: '₹35,400 - ₹1,12,400',
    lastDate: '28 Feb 2025'
  },
  {
    id: 4,
    advt: 'PRD/2024/04',
    title: 'Data Entry Operator',
    department: 'Panchayati Raj Department, Bihar',
    posts: '500',
    pay: '₹19,900 - ₹63,200',
    lastDate: '10 Mar 2025'
  }
]

const closed = [
  { id: 5, title: 'Gram Rozgar Sevak', department: 'PRD Bihar', posts: '1,200', lastDate: '15 Dec 2024' },
  { id: 6, title: 'Accountant', department: 'PRD Bihar', posts: '80', lastDate: '30 Nov 2024' },
  { id: 7, title: 'Computer Operator', department: 'PRD Bihar', posts: '200', lastDate: '20 Oct 2024' }
]
</script>
