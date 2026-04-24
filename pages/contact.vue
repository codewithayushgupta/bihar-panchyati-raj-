<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />
    <div class="max-w-7xl mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Contact Us</h1>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="card p-6">
          <h2 class="text-xl font-semibold text-[var(--text-primary)] mb-4">Head Office</h2>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-[var(--color-600)] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <div>
                <div class="font-medium text-[var(--text-primary)]">Address</div>
                <p class="text-sm text-[var(--text-secondary)]">Panchayati Raj Department<br>Vikas Bhawan, Bailey Road<br>Patna - 800015, Bihar</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-[var(--color-600)] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <div>
                <div class="font-medium text-[var(--text-primary)]">Phone</div>
                <p class="text-sm text-[var(--text-secondary)]">+91-612-2235661<br>+91-612-2235662</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-[var(--color-600)] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <div>
                <div class="font-medium text-[var(--text-primary)]">Email</div>
                <p class="text-sm text-[var(--text-secondary)]">prd-bihar@gov.in<br>support@biharprd.gov.in</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card p-6">
          <h2 class="text-xl font-semibold text-[var(--text-primary)] mb-4">Important Contacts</h2>
          <div class="space-y-3">
            <div v-for="contact in contacts" :key="contact.title" class="border-b pb-3 last:border-b-0">
              <div class="font-medium text-[var(--text-primary)] text-sm">{{ contact.title }}</div>
              <div class="text-sm text-[var(--text-secondary)]">{{ contact.phone }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
const contacts = [
  { title: 'Principal Secretary', phone: '+91-612-2235661' },
  { title: 'Secretary', phone: '+91-612-2235662' },
  { title: 'Grievance Cell', phone: '+91-612-2235663' },
  { title: 'Technical Support', phone: '+91-612-2235664' },
  { title: 'RTI Cell', phone: '+91-612-2235665' }
]
</script>
