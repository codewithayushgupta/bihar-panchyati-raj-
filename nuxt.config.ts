export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  components: [
    { path: '~/components', pathPrefix: false },
  ],
  css: ['~/assets/css/global.css'],
  app: {
    head: {
      title: 'Bihar PRD — Unified Digital Governance Platform',
      meta: [
        { name: 'description', content: 'Government of Bihar — Panchayati Raj Department Digital Platform' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      appName: 'Bihar PRD'
    }
  },
  nitro: {
    preset: 'vercel'
  }
})
