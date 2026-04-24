<template>
  <aside class="fixed left-0 top-0 h-full w-64 bg-[var(--sidebar-bg)] flex flex-col z-40 transition-transform duration-300" :class="open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'">
    <!-- Header -->
    <div class="flex items-center gap-3 px-4 py-4 border-b border-prd-amber-800">
      <div class="w-9 h-9 bg-prd-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">PRD</div>
      <div>
        <div class="text-white font-bold text-sm">Bihar PRD</div>
        <div class="text-prd-amber-400 text-xs">{{ panelLabel }}</div>
      </div>
      <button @click="$emit('close')" class="ml-auto lg:hidden text-prd-amber-400 hover:text-white">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>

    <!-- User Info -->
    <div class="px-4 py-3 border-b border-prd-amber-800">
      <div class="text-white text-sm font-medium">{{ authStore.user?.name }}</div>
      <div class="text-prd-amber-400 text-xs mt-0.5">{{ authStore.user?.designation }}</div>
      <span class="inline-block mt-1 px-2 py-0.5 bg-prd-amber-600 text-white text-xs rounded-full">{{ roleLabel }}</span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
      <!-- All roles -->
      <SidebarLink to="/admin" icon="home" label="Dashboard" exact />
      <SidebarLink to="/admin/complaints" icon="chat" label="Complaints" />
      <SidebarLink to="/admin/funds" icon="currency" label="Fund Management" />
      <SidebarLink to="/admin/projects" icon="briefcase" label="Projects" />
      <SidebarLink to="/admin/panchayat" icon="office" label="Panchayats" />

      <!-- State & District Admin only -->
      <template v-if="isStateOrDistrict">
        <div class="pt-2 pb-1 px-2 mt-1">
          <span class="text-prd-amber-600 text-xs font-semibold uppercase tracking-wider">Management</span>
        </div>
        <SidebarLink to="/admin/mis" icon="chart" label="MIS / Officers" />
        <SidebarLink to="/admin/training" icon="academic" label="Training" />
        <SidebarLink to="/admin/integrations" icon="link" label="Integrations" />
      </template>

      <div class="pt-2 border-t border-prd-amber-800 mt-2 space-y-0.5">
        <SidebarLink to="/admin/profile" icon="user" label="My Profile" />
        <NuxtLink to="/" class="sidebar-link sidebar-link-inactive text-xs">← Public Site</NuxtLink>
      </div>
    </nav>

    <!-- Footer -->
    <div class="px-4 py-3 border-t border-prd-amber-800">
      <div class="text-xs text-prd-amber-500 mb-2 truncate">{{ authStore.user?.email }}</div>
      <button @click="authStore.logout()" class="w-full text-left text-prd-amber-400 hover:text-white text-sm flex items-center gap-2 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
        Logout
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
defineProps({ open: Boolean })
defineEmits(['close'])
const authStore = useAuthStore()
const roleLabel = computed(() => ({
  state_admin: 'State Admin',
  district_admin: 'District Admin',
  block_admin: 'Block Admin',
  panchayat_admin: 'Panchayat Admin'
}[authStore.role] || authStore.role))

const panelLabel = computed(() => ({
  state_admin: 'State Admin Panel',
  district_admin: 'District Admin Panel',
  block_admin: 'Block Admin Panel',
  panchayat_admin: 'Panchayat Panel'
}[authStore.role] || 'Admin Panel'))
const isStateOrDistrict = computed(() => ['state_admin', 'district_admin'].includes(authStore.role))
</script>
