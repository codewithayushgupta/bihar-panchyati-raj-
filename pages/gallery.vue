<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />
    <div class="max-w-7xl mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Photo Gallery</h1>
      <div class="flex gap-2 mb-6 flex-wrap">
        <button v-for="cat in categories" :key="cat" @click="active = cat"
          class="px-4 py-2 rounded-full text-sm transition-colors"
          :class="active === cat ? 'bg-[var(--color-600)] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--color-100)]'">
          {{ cat }}
        </button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="item in filtered" :key="item.id" class="card overflow-hidden group cursor-pointer">
          <div class="aspect-square bg-gradient-to-br from-prd-amber-100 to-prd-amber-200 dark:from-prd-amber-900/30 dark:to-prd-amber-800/30 flex items-center justify-center">
            <svg class="w-12 h-12 text-[var(--color-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <div class="p-3">
            <p class="text-sm font-medium text-[var(--text-primary)]">{{ item.title }}</p>
            <p class="text-xs text-[var(--text-secondary)]">{{ item.date }}</p>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
const categories = ['All', 'Events', 'Projects', 'Training', 'Meetings']
const active = ref('All')

const gallery = [
  { id: 1, title: 'Gram Sabha Meeting', date: 'Jan 2024', category: 'Meetings' },
  { id: 2, title: 'Road Construction', date: 'Feb 2024', category: 'Projects' },
  { id: 3, title: 'Training Workshop', date: 'Mar 2024', category: 'Training' },
  { id: 4, title: 'Swachh Bharat Drive', date: 'Apr 2024', category: 'Events' },
  { id: 5, title: 'Water Supply Project', date: 'May 2024', category: 'Projects' },
  { id: 6, title: 'Capacity Building', date: 'Jun 2024', category: 'Training' },
  { id: 7, title: 'Annual Review Meeting', date: 'Jul 2024', category: 'Meetings' },
  { id: 8, title: 'School Construction', date: 'Aug 2024', category: 'Projects' },
]

const filtered = computed(() => active.value === 'All' ? gallery : gallery.filter(g => g.category === active.value))
</script>
