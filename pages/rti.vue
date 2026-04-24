<template>
  <div class="min-h-screen bg-[var(--bg-primary)]">
    <AppNavbar />

    <!-- Header -->
    <section class="bg-gradient-to-br from-prd-amber-700 to-prd-amber-800 text-white py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-2">Right to Information (RTI)</h1>
        <p class="text-[var(--color-200)]">File RTI applications and access public information</p>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 py-10">
      <div class="grid md:grid-cols-3 gap-6 mb-10">
        <div class="card p-6 text-center">
          <div class="w-12 h-12 bg-[var(--color-100)] dark:bg-[var(--color-900)]/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-[var(--color-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 class="font-semibold text-[var(--text-primary)] mb-2">File RTI Application</h3>
          <p class="text-sm text-[var(--text-secondary)] mb-4">Submit your RTI application online</p>
          <button class="btn-primary w-full text-sm">Apply Now</button>
        </div>
        <div class="card p-6 text-center">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <h3 class="font-semibold text-[var(--text-primary)] mb-2">Track Application</h3>
          <p class="text-sm text-[var(--text-secondary)] mb-4">Check status of your RTI application</p>
          <button class="btn-secondary w-full text-sm">Track Now</button>
        </div>
        <div class="card p-6 text-center">
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 class="font-semibold text-[var(--text-primary)] mb-2">Download Forms</h3>
          <p class="text-sm text-[var(--text-secondary)] mb-4">Download RTI application forms</p>
          <button class="btn-secondary w-full text-sm">Download</button>
        </div>
      </div>

      <!-- PIOs -->
      <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-4">Public Information Officers (PIOs)</h2>
      <div class="card overflow-hidden mb-10">
        <table class="w-full text-sm">
          <thead class="bg-[var(--bg-secondary)]">
            <tr>
              <th class="text-left p-4 text-[var(--text-secondary)] font-medium">Name</th>
              <th class="text-left p-4 text-[var(--text-secondary)] font-medium">Designation</th>
              <th class="text-left p-4 text-[var(--text-secondary)] font-medium">Department</th>
              <th class="text-left p-4 text-[var(--text-secondary)] font-medium">Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pio in pios" :key="pio.name" class="border-t border-[var(--border-color)]">
              <td class="p-4 font-medium text-[var(--text-primary)]">{{ pio.name }}</td>
              <td class="p-4 text-[var(--text-secondary)]">{{ pio.designation }}</td>
              <td class="p-4 text-[var(--text-secondary)]">{{ pio.dept }}</td>
              <td class="p-4 text-[var(--text-secondary)]">{{ pio.contact }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- RTI Info -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-[var(--text-primary)] mb-3">How to File RTI</h3>
          <ol class="space-y-2 text-sm text-[var(--text-secondary)]">
            <li class="flex gap-2"><span class="font-bold text-[var(--color-600)]">1.</span> Write application in Hindi or English</li>
            <li class="flex gap-2"><span class="font-bold text-[var(--color-600)]">2.</span> Pay ₹10 fee (IPO/DD/Cash)</li>
            <li class="flex gap-2"><span class="font-bold text-[var(--color-600)]">3.</span> Submit to concerned PIO</li>
            <li class="flex gap-2"><span class="font-bold text-[var(--color-600)]">4.</span> Response within 30 days</li>
          </ol>
        </div>
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-[var(--text-primary)] mb-3">Important Timelines</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-[var(--text-secondary)]">Normal response</span><span class="font-medium text-[var(--text-primary)]">30 days</span></div>
            <div class="flex justify-between"><span class="text-[var(--text-secondary)]">Life/liberty matters</span><span class="font-medium text-[var(--text-primary)]">48 hours</span></div>
            <div class="flex justify-between"><span class="text-[var(--text-secondary)]">First appeal</span><span class="font-medium text-[var(--text-primary)]">30 days</span></div>
            <div class="flex justify-between"><span class="text-[var(--text-secondary)]">Second appeal (CIC)</span><span class="font-medium text-[var(--text-primary)]">90 days</span></div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
const pios = [
  { name: 'Shri Ramesh Kumar', designation: 'Under Secretary', dept: 'PRD Headquarters', contact: '+91-612-2235661' },
  { name: 'Shri Suresh Singh', designation: 'Section Officer', dept: 'Finance Wing', contact: '+91-612-2235662' },
  { name: 'Smt. Priya Sharma', designation: 'Deputy Secretary', dept: 'Planning Wing', contact: '+91-612-2235663' },
  { name: 'Shri Anil Verma', designation: 'Assistant Secretary', dept: 'Technical Wing', contact: '+91-612-2235664' }
]
</script>
