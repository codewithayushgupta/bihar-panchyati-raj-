<template>
  <div class="min-h-screen bg-[var(--bg-primary)] flex">
    <AppSidebar :open="sidebarOpen" @close="sidebarOpen=false" />
    <!-- Overlay -->
    <div v-if="sidebarOpen" class="fixed inset-0 bg-black/50 z-30 lg:hidden" @click="sidebarOpen=false"></div>
    <!-- Main -->
    <div class="flex-1 lg:ml-64 flex flex-col min-h-screen">
      <!-- Top Bar -->
      <header class="sticky top-0 z-20 bg-[var(--bg-card)] border-b border-[var(--border-color)] px-4 h-14 flex items-center gap-3">
        <button @click="sidebarOpen=true" class="lg:hidden p-1.5 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <div class="flex-1">
          <BreadcrumbBar />
        </div>
        <button @click="toggleDark()" class="p-1.5 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors">
          <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
        </button>
      </header>
      <!-- Content -->
      <main class="flex-1 p-4 md:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
<script setup>
const sidebarOpen = ref(false)
const toggleDark = inject('toggleDark')
const isDark = inject('isDark')
</script>
