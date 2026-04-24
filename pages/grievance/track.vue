<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />
    <div class="max-w-2xl mx-auto px-4 py-8">
      <h1 class="page-title mb-2">Track Your Complaint</h1>
      <p class="text-[var(--text-secondary)] mb-6">Enter your 10-character tracking token to check status</p>

      <!-- Search -->
      <div class="card p-5 mb-6">
        <div class="flex gap-3">
          <input v-model="token" class="input-field font-mono uppercase tracking-widest text-lg" placeholder="TRK0000PBH" maxlength="10" @keyup.enter="track" />
          <button @click="track" class="btn-primary whitespace-nowrap">Track</button>
        </div>
        <div v-if="error" class="mt-3 text-red-500 dark:text-red-400 text-sm">{{ error }}</div>
      </div>

      <!-- Result -->
      <div v-if="complaint" class="space-y-4">
        <!-- Status Header -->
        <div class="card p-5">
          <div class="flex items-start justify-between mb-3">
            <div>
              <div class="text-xs text-[var(--text-secondary)] mb-1">Complaint ID</div>
              <div class="font-mono font-bold text-[var(--text-primary)]">{{ complaint.id }}</div>
            </div>
            <StatusBadge :status="complaint.status" />
          </div>
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div><span class="text-[var(--text-secondary)]">Category: </span><span class="font-medium">{{ complaint.category }}</span></div>
            <div><span class="text-[var(--text-secondary)]">Priority: </span><span class="font-medium capitalize">{{ complaint.priority }}</span></div>
            <div><span class="text-[var(--text-secondary)]">Location: </span><span class="font-medium">{{ complaint.panchayat }}, {{ complaint.district }}</span></div>
            <div><span class="text-[var(--text-secondary)]">Filed: </span><span class="font-medium">{{ formatDate(complaint.submitted_at) }}</span></div>
          </div>
          <div class="mt-3 p-3 bg-[var(--bg-secondary)] rounded-lg text-sm text-[var(--text-primary)]">{{ complaint.description }}</div>
        </div>

        <!-- Progress Stepper -->
        <div class="card p-5">
          <h3 class="section-title mb-4">Progress</h3>
          <div class="flex items-center justify-between">
            <div v-for="(step, i) in steps" :key="step" class="flex flex-col items-center flex-1">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors"
                :class="stepIndex >= i ? 'bg-[var(--color-600)] border-[var(--color-600)] text-white' : 'border-[var(--border-color)] text-[var(--text-secondary)]'">
                {{ i + 1 }}
              </div>
              <div class="text-xs text-center mt-1 text-[var(--text-secondary)] hidden sm:block">{{ step }}</div>
              <div v-if="i < steps.length - 1" class="absolute h-0.5 w-full bg-[var(--border-color)]"></div>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="card p-5">
          <h3 class="section-title mb-4">Activity Timeline</h3>
          <div class="space-y-4">
            <div v-for="(event, i) in complaint.timeline" :key="i" class="flex gap-3">
              <div class="flex flex-col items-center">
                <div class="w-3 h-3 rounded-full bg-[var(--color-600)] mt-1 flex-shrink-0"></div>
                <div v-if="i < complaint.timeline.length - 1" class="w-0.5 bg-[var(--border-color)] flex-1 mt-1"></div>
              </div>
              <div class="pb-4 flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <StatusBadge :status="event.status" />
                  <span class="text-xs text-[var(--text-secondary)]">by {{ event.actor }}</span>
                  <span class="text-xs text-[var(--text-secondary)] ml-auto">{{ formatDate(event.date) }}</span>
                </div>
                <p class="text-sm text-[var(--text-primary)] mt-1">{{ event.note }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Rating (if resolved) -->
        <div v-if="complaint.status === 'Resolved' && !ratingSubmitted" class="card p-5">
          <h3 class="section-title mb-3">Rate the Resolution</h3>
          <div class="flex gap-2 mb-3">
            <button v-for="s in 5" :key="s" @click="rating = s" class="text-2xl transition-transform hover:scale-110" :class="s <= rating ? 'text-yellow-400' : 'text-[var(--border-color)]'">★</button>
          </div>
          <textarea v-model="feedback" class="input-field resize-none" rows="2" placeholder="Optional feedback..."></textarea>
          <button @click="submitRating" class="btn-primary mt-3">Submit Rating</button>
        </div>
        <div v-if="ratingSubmitted" class="card p-4 text-center text-[var(--color-600)] dark:text-[var(--color-400)] font-medium">
          ✓ Thank you for your feedback!
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { useComplaintsStore } from '~/stores/complaints'
const store = useComplaintsStore()
const token = ref('')
const complaint = ref(null)
const error = ref('')
const rating = ref(0)
const feedback = ref('')
const ratingSubmitted = ref(false)

const steps = ['Submitted', 'Acknowledged', 'In Progress', 'Resolved']
const statusOrder = ['Submitted', 'Acknowledged', 'Under Review', 'Assigned', 'In Progress', 'Resolved', 'Closed']
const stepIndex = computed(() => {
  const s = complaint.value?.status
  if (['Resolved', 'Closed'].includes(s)) return 3
  if (['In Progress', 'Assigned'].includes(s)) return 2
  if (['Acknowledged', 'Under Review'].includes(s)) return 1
  return 0
})

async function track() {
  if (!token.value.trim()) { error.value = 'Please enter a tracking token.'; return }
  if (!store.all.length) await store.fetchAll()
  const found = store.findByToken(token.value.toUpperCase())
  if (found) {
    complaint.value = found
    error.value = ''
  } else {
    // For demo: generate a realistic dummy complaint for any unknown token
    const t = token.value.toUpperCase()
    complaint.value = {
      id: 'GRV/' + new Date().getFullYear() + '/04/' + Math.floor(10000 + Math.random() * 90000),
      token: t,
      category: 'Water Supply',
      subcategory: 'Non-functional handpump',
      district: 'Patna',
      block: 'Masaurhi',
      panchayat: 'Nagwan',
      ward: '4',
      description: 'The hand pump near the primary school has not been functional for the past 2 weeks. Residents are facing acute water shortage.',
      complainant: { name: 'Ramesh Prasad', phone: '98XXXXXXXX', is_anonymous: false },
      priority: 'high',
      status: 'In Progress',
      is_escalated: false,
      rating: null,
      submitted_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      timeline: [
        { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), status: 'Submitted', actor: 'System', note: 'शिकायत दर्ज की गई — Complaint registered successfully' },
        { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), status: 'Acknowledged', actor: 'Block Admin', note: 'Received and logged by Masaurhi Block Office' },
        { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), status: 'In Progress', actor: 'Arvind Kumar Sharma', note: 'Site visited. Repair work initiated.' },
      ]
    }
    error.value = ''
  }
}

function submitRating() { ratingSubmitted.value = true }
function formatDate(d) { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }

onMounted(async () => {
  await store.fetchAll()
  const q = useRoute().query.token
  if (q) { token.value = q; track() }
})
</script>
