<template>
  <nav class="sticky top-0 z-50 bg-prd-amber-700 dark:bg-prd-amber-900 shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-prd-amber-700 font-bold text-sm">PRD</div>
          <div class="hidden sm:block">
            <div class="text-white font-bold text-sm leading-tight">Bihar PRD</div>
            <div class="text-prd-amber-200 text-xs">Panchayati Raj Department</div>
          </div>
        </NuxtLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-1">
          <NavLink to="/" label="Home" />
          <NavLink to="/map" label="GIS Map" />
          <NavLink to="/dashboard" label="Dashboard" />
          <NavLink to="/schemes" label="Schemes" />
          <NavLink to="/grievance" label="Grievance" />
          <NavLink to="/notices" label="Notices" />

          <!-- About Dropdown -->
          <div class="relative" @mouseenter="openDropdown('about')" @mouseleave="closeDropdown">
            <button class="flex items-center gap-1 px-3 py-2 text-prd-amber-100 hover:text-white hover:bg-prd-amber-600 rounded-lg text-sm transition-colors">
              About
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div v-if="activeDropdown === 'about'" class="absolute top-full left-0 mt-1 w-52 bg-white dark:bg-prd-amber-900 rounded-xl shadow-xl border border-gray-100 dark:border-prd-amber-700 py-1 z-50">
              <NuxtLink v-for="item in aboutLinks" :key="item.to" :to="item.to" @click="closeDropdown"
                class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-prd-amber-100 hover:bg-prd-amber-50 dark:hover:bg-prd-amber-800 transition-colors">
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>

          <!-- Tenders -->
          <NavLink to="/tenders" label="Tenders" />

          <!-- More Dropdown -->
          <div class="relative" @mouseenter="openDropdown('more')" @mouseleave="closeDropdown">
            <button class="flex items-center gap-1 px-3 py-2 text-prd-amber-100 hover:text-white hover:bg-prd-amber-600 rounded-lg text-sm transition-colors">
              More
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div v-if="activeDropdown === 'more'" class="absolute top-full right-0 mt-1 w-52 bg-white dark:bg-prd-amber-900 rounded-xl shadow-xl border border-gray-100 dark:border-prd-amber-700 py-1 z-50">
              <NuxtLink v-for="item in moreLinks" :key="item.to" :to="item.to" @click="closeDropdown"
                class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-prd-amber-100 hover:bg-prd-amber-50 dark:hover:bg-prd-amber-800 transition-colors">
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-2">
          <button @click="toggleDark()" class="p-2 rounded-lg text-prd-amber-200 hover:text-white hover:bg-prd-amber-600 transition-colors" :title="isDark ? 'Light Mode' : 'Dark Mode'">
            <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
          </button>
          <NuxtLink v-if="!authStore.user" to="/auth/login" class="btn-orange text-sm py-1.5 px-3">Login</NuxtLink>
          <div v-else class="flex items-center gap-2">
            <template v-if="authStore.role === 'citizen'">
              <NuxtLink to="/citizen/dashboard" class="btn-orange text-sm py-1.5 px-3">My Dashboard</NuxtLink>
              <button @click="authStore.logout()" class="text-prd-amber-200 hover:text-white text-sm px-2">Logout</button>
            </template>
            <template v-else>
              <NuxtLink to="/admin" class="btn-orange text-sm py-1.5 px-3">Dashboard</NuxtLink>
              <button @click="authStore.logout()" class="text-prd-amber-200 hover:text-white text-sm px-2">Logout</button>
            </template>
          </div>
          <!-- Mobile menu -->
          <button @click="mobileOpen = !mobileOpen" class="md:hidden p-2 text-prd-amber-200 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileOpen" class="md:hidden pb-3 border-t border-prd-amber-600 mt-1 pt-2 space-y-1">
        <MobileNavLink to="/" label="Home" @click="mobileOpen=false" />
        <MobileNavLink to="/map" label="GIS Map" @click="mobileOpen=false" />
        <MobileNavLink to="/dashboard" label="Dashboard" @click="mobileOpen=false" />
        <MobileNavLink to="/schemes" label="Schemes" @click="mobileOpen=false" />
        <MobileNavLink to="/grievance" label="File Grievance" @click="mobileOpen=false" />
        <MobileNavLink to="/grievance/track" label="Track Complaint" @click="mobileOpen=false" />
        <MobileNavLink to="/notices" label="Notices" @click="mobileOpen=false" />
        <MobileNavLink to="/tenders" label="Tenders" @click="mobileOpen=false" />
        <MobileNavLink to="/recruitment" label="Recruitment" @click="mobileOpen=false" />
        <MobileNavLink to="/rti" label="RTI" @click="mobileOpen=false" />
        <!-- About section -->
        <div class="px-3 pt-2 pb-1 text-xs text-prd-amber-400 uppercase tracking-wider">About</div>
        <MobileNavLink v-for="item in aboutLinks" :key="item.to" :to="item.to" :label="item.label" @click="mobileOpen=false" />
        <!-- More section -->
        <div class="px-3 pt-2 pb-1 text-xs text-prd-amber-400 uppercase tracking-wider">More</div>
        <MobileNavLink v-for="item in moreLinks" :key="item.to" :to="item.to" :label="item.label" @click="mobileOpen=false" />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()
const toggleDark = inject('toggleDark')
const isDark = inject('isDark')
const mobileOpen = ref(false)
const activeDropdown = ref(null)

let closeTimer = null

const openDropdown = (name) => {
  clearTimeout(closeTimer)
  activeDropdown.value = name
}

const closeDropdown = () => {
  closeTimer = setTimeout(() => {
    activeDropdown.value = null
  }, 150)
}

const aboutLinks = [
  { to: '/about', label: 'About Department' },
  { to: '/history', label: 'History' },
  { to: '/organization', label: 'Organizational Structure' },
  { to: '/functions', label: 'Functions & Responsibilities' },
  { to: '/contact', label: 'Contact Us' },
]

const moreLinks = [
  { to: '/recruitment', label: 'Recruitment' },
  { to: '/rti', label: 'RTI' },
  { to: '/acts-rules', label: 'Acts & Rules' },
  { to: '/schemes-info', label: 'Schemes Information' },
  { to: '/downloads', label: 'Downloads' },
  { to: '/gallery', label: 'Photo Gallery' },
  { to: '/faqs', label: 'FAQs' },
  { to: '/directory', label: 'Directory' },
]
</script>
