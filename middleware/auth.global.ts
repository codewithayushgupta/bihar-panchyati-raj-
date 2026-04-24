import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  authStore.restore()

  if (to.path.startsWith('/admin')) {
    if (!authStore.token) {
      return navigateTo('/auth/login?redirect=' + to.path)
    }
    if (authStore.role === 'citizen') {
      return navigateTo('/')
    }
  }
})
