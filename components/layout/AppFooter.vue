<template>
  <footer class="bg-prd-amber-800 dark:bg-prd-amber-900 text-prd-amber-100 mt-auto">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h3 class="text-white font-bold mb-3">Bihar PRD</h3>
          <p class="text-sm text-prd-amber-300">Panchayati Raj Department, Government of Bihar</p>
          <p class="text-xs text-prd-amber-400 mt-2">Unified Digital Governance Platform</p>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-3 text-sm">Quick Links</h4>
          <ul class="space-y-1.5 text-sm">
            <li><NuxtLink to="/map" class="hover:text-white transition-colors">GIS Map</NuxtLink></li>
            <li><NuxtLink to="/schemes" class="hover:text-white transition-colors">Schemes</NuxtLink></li>
            <li><NuxtLink to="/grievance" class="hover:text-white transition-colors">File Grievance</NuxtLink></li>
            <li><NuxtLink to="/dashboard" class="hover:text-white transition-colors">Dashboard</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-3 text-sm">Resources</h4>
          <ul class="space-y-1.5 text-sm">
            <li><NuxtLink to="/notices" class="hover:text-white transition-colors">Notices</NuxtLink></li>
            <li><NuxtLink to="/directory" class="hover:text-white transition-colors">Directory</NuxtLink></li>
            <li><NuxtLink to="/recruitment" class="hover:text-white transition-colors">Recruitment</NuxtLink></li>
            <li><a href="#" class="hover:text-white transition-colors">RTI</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-3 text-sm">Contact</h4>
          <p class="text-sm text-prd-amber-300">Panchayati Raj Department<br>Vikas Bhawan, Patna<br>Bihar - 800001</p>
          <p class="text-sm text-prd-amber-300 mt-2">Email: prd@bihar.gov.in<br>Helpline: 1800-XXX-XXXX</p>
        </div>
      </div>
      <div class="border-t border-prd-amber-700 mt-6 pt-4 text-center text-xs text-prd-amber-400">
        © 2025 Government of Bihar — Panchayati Raj Department. All rights reserved.
      </div>
    </div>
  </footer>
</template>
