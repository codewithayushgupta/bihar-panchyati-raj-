<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />
    <div class="max-w-7xl mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Frequently Asked Questions</h1>
      <div class="space-y-3">
        <div v-for="(faq, idx) in faqs" :key="idx" class="card">
          <button @click="toggle(idx)" class="w-full p-4 text-left flex items-center justify-between">
            <span class="font-medium text-[var(--text-primary)]">{{ faq.q }}</span>
            <svg class="w-5 h-5 text-[var(--text-secondary)] transition-transform" :class="{ 'rotate-180': open === idx }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div v-if="open === idx" class="px-4 pb-4 text-[var(--text-secondary)]">{{ faq.a }}</div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
const open = ref(null)
const toggle = (idx) => open.value = open.value === idx ? null : idx

const faqs = [
  { q: 'How do I file a grievance?', a: 'Visit the Grievance section, fill out the complaint form with required details, and submit. You will receive a tracking ID.' },
  { q: 'How can I track my complaint status?', a: 'Use the Track Complaint option with your complaint ID and registered mobile number.' },
  { q: 'What is the resolution timeline for complaints?', a: 'Most complaints are resolved within 15-30 days depending on complexity and category.' },
  { q: 'How do I apply for government schemes?', a: 'Visit your nearest Gram Panchayat office or Block Development Office with required documents.' },
  { q: 'Where can I find information about tenders?', a: 'All active tenders are listed in the Tenders section with detailed documentation.' },
  { q: 'How do I file an RTI application?', a: 'Visit the RTI section, download the application form, fill it, and submit with prescribed fee.' },
  { q: 'What are the three tiers of Panchayati Raj?', a: 'Gram Panchayat (village level), Panchayat Samiti (block level), and Zila Parishad (district level).' },
  { q: 'How can I check fund utilization data?', a: 'Visit the Dashboard section for comprehensive fund allocation and utilization reports.' }
]
</script>
