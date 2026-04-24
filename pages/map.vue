<template>
  <div class="min-h-screen bg-[var(--bg-primary)] flex flex-col">
    <AppNavbar />
    <div class="flex flex-1 overflow-hidden" style="height: calc(100vh - 64px)">
      <!-- Filter Panel -->
      <div class="w-72 bg-[var(--bg-card)] border-r border-[var(--border-color)] flex flex-col overflow-y-auto flex-shrink-0 hidden md:flex">
        <div class="p-4 border-b border-[var(--border-color)]">
          <h2 class="font-bold text-[var(--text-primary)]">GIS Map Explorer</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Bihar Panchayati Raj</p>
        </div>
        <div class="p-4 space-y-4">
          <div>
            <label class="label-text">Data Layer</label>
            <select v-model="activeLayer" class="select-field text-sm">
              <option value="fund">Fund Utilization</option>
              <option value="complaints">Complaints Density</option>
              <option value="projects">Project Progress</option>
            </select>
          </div>
          <div>
            <label class="label-text">District</label>
            <select v-model="selectedDistrict" class="select-field text-sm">
              <option value="">All Districts</option>
              <option v-for="d in districts" :key="d.code" :value="d.name">{{ d.name }}</option>
            </select>
          </div>
          <!-- Legend -->
          <div>
            <label class="label-text">Legend</label>
            <div class="space-y-1.5">
              <div v-for="l in legend" :key="l.label" class="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <div class="w-4 h-4 rounded flex-shrink-0" :style="{ backgroundColor: l.color }"></div>
                {{ l.label }}
              </div>
            </div>
          </div>
          <!-- Panchayat List -->
          <div>
            <label class="label-text">Panchayats ({{ filteredPanchayats.length }})</label>
            <div class="space-y-1 max-h-64 overflow-y-auto">
              <div v-for="p in filteredPanchayats" :key="p.id" class="p-2 rounded-lg hover:bg-[var(--bg-secondary)] cursor-pointer transition-colors text-xs" @click="selectPanchayat(p)">
                <div class="font-medium text-[var(--text-primary)]">{{ p.name }}</div>
                <div class="text-[var(--text-secondary)]">{{ p.block }}, {{ p.district }}</div>
                <div class="flex items-center gap-2 mt-1">
                  <span :class="p.funds_summary.utilization_pct >= 80 ? 'text-green-600 dark:text-green-400' : p.funds_summary.utilization_pct >= 60 ? 'text-orange-500' : 'text-red-500'">{{ p.funds_summary.utilization_pct }}% funds</span>
                  <span class="text-[var(--text-secondary)]">{{ p.complaints.open }} open</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Map -->
      <div class="flex-1 relative">
        <div id="bihar-map" class="w-full h-full"></div>
        <!-- Selected Panchayat Info -->
        <div v-if="selectedPanchayat" class="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-[var(--bg-card)] rounded-xl shadow-xl border border-[var(--border-color)] p-4 z-10">
          <div class="flex items-start justify-between mb-2">
            <div>
              <h3 class="font-bold text-[var(--text-primary)]">{{ selectedPanchayat.name }}</h3>
              <p class="text-xs text-[var(--text-secondary)]">{{ selectedPanchayat.block }}, {{ selectedPanchayat.district }}</p>
            </div>
            <button @click="selectedPanchayat=null" class="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">✕</button>
          </div>
          <div class="grid grid-cols-2 gap-2 text-xs mb-3">
            <div class="bg-[var(--bg-secondary)] rounded-lg p-2 text-center">
              <div class="font-bold text-[var(--text-primary)]">{{ selectedPanchayat.demographics.total_population.toLocaleString('en-IN') }}</div>
              <div class="text-[var(--text-secondary)]">Population</div>
            </div>
            <div class="bg-[var(--bg-secondary)] rounded-lg p-2 text-center">
              <div class="font-bold" :class="selectedPanchayat.funds_summary.utilization_pct >= 80 ? 'text-green-600 dark:text-green-400' : 'text-orange-500'">{{ selectedPanchayat.funds_summary.utilization_pct }}%</div>
              <div class="text-[var(--text-secondary)]">Fund Used</div>
            </div>
            <div class="bg-[var(--bg-secondary)] rounded-lg p-2 text-center">
              <div class="font-bold text-[var(--text-primary)]">{{ selectedPanchayat.complaints.open }}</div>
              <div class="text-[var(--text-secondary)]">Open Cases</div>
            </div>
            <div class="bg-[var(--bg-secondary)] rounded-lg p-2 text-center">
              <div class="font-bold text-yellow-500">★ {{ selectedPanchayat.rating.score }}</div>
              <div class="text-[var(--text-secondary)]">Rating</div>
            </div>
          </div>
          <div class="text-xs text-[var(--text-secondary)] mb-2">
            <span class="font-medium text-[var(--text-primary)]">Mukhiya:</span> {{ selectedPanchayat.elected_body.mukhiya.name }} ·
            <span class="font-medium text-[var(--text-primary)]">Sachiv:</span> {{ selectedPanchayat.administration.sachiv.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: panchayats } = await useFetch('/api/panchayats')
const { data: districts } = await useFetch('/api/districts')
const activeLayer = ref('fund')
const selectedDistrict = ref('')
const selectedPanchayat = ref(null)
let map = null

const filteredPanchayats = computed(() => (panchayats.value || []).filter(p => !selectedDistrict.value || p.district === selectedDistrict.value))

const legend = computed(() => ({
  fund: [
    { color: '#1A6B3C', label: '80%+ utilization' },
    { color: '#E07B00', label: '60-80% utilization' },
    { color: '#dc2626', label: 'Below 60%' },
  ],
  complaints: [
    { color: '#1e40af', label: '10+ complaints' },
    { color: '#3b82f6', label: '5-10 complaints' },
    { color: '#93c5fd', label: 'Under 5' },
  ],
  projects: [
    { color: '#1A6B3C', label: '80%+ complete' },
    { color: '#E07B00', label: '50-80% complete' },
    { color: '#dc2626', label: 'Under 50%' },
  ],
}[activeLayer.value]))

function getMarkerColor(p) {
  if (activeLayer.value === 'fund') return p.funds_summary.utilization_pct >= 80 ? '#1A6B3C' : p.funds_summary.utilization_pct >= 60 ? '#E07B00' : '#dc2626'
  if (activeLayer.value === 'complaints') return p.complaints.open >= 10 ? '#1e40af' : p.complaints.open >= 5 ? '#3b82f6' : '#93c5fd'
  const pct = p.projects.total > 0 ? (p.projects.completed / p.projects.total) * 100 : 0
  return pct >= 80 ? '#1A6B3C' : pct >= 50 ? '#E07B00' : '#dc2626'
}

function selectPanchayat(p) { selectedPanchayat.value = p }

onMounted(async () => {
  if (!process.client) return
  const L = (await import('leaflet')).default
  map = L.map('bihar-map', { center: [25.0961, 85.3131], zoom: 7, minZoom: 6, maxZoom: 14 })
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap | Bihar PRD', maxZoom: 19 }).addTo(map)

  const addMarkers = () => {
    map.eachLayer(layer => { if (layer instanceof L.CircleMarker) map.removeLayer(layer) })
    ;(panchayats.value || []).forEach(p => {
      const color = getMarkerColor(p)
      L.circleMarker([p.geo.lat, p.geo.lng], { radius: 8, fillColor: color, color: '#fff', weight: 1.5, opacity: 1, fillOpacity: 0.85 })
        .addTo(map)
        .bindPopup(`<div style="min-width:180px"><b>${p.name}</b><br><small>${p.block}, ${p.district}</small><br><br>Population: ${p.demographics.total_population.toLocaleString('en-IN')}<br>Fund Utilization: ${p.funds_summary.utilization_pct}%<br>Open Complaints: ${p.complaints.open}<br>Rating: ★ ${p.rating.score}</div>`)
        .on('click', () => selectPanchayat(p))
    })
  }

  watch([activeLayer, filteredPanchayats], addMarkers, { immediate: true })
})

onUnmounted(() => { if (map) { map.remove(); map = null } })
</script>
