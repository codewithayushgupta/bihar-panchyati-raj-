import { defineStore } from 'pinia'
import en from '~/locales/en'
import hi from '~/locales/hi'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    currentLang: 'en', // 'en' | 'hi'
    translations: { en, hi },
    cache: {}, // Cache for API translations: { 'en:hello': 'hello', 'hi:hello': 'नमस्ते' }
  }),

  getters: {
    isHindi: (state) => state.currentLang === 'hi',
    isEnglish: (state) => state.currentLang === 'en',
  },

  actions: {
    // Switch language
    setLanguage(lang) {
      if (lang !== 'en' && lang !== 'hi') return
      this.currentLang = lang
      if (process.client) {
        localStorage.setItem('language', lang)
        document.documentElement.setAttribute('lang', lang)
      }
    },

    // Initialize from localStorage
    initLanguage() {
      if (process.client) {
        const saved = localStorage.getItem('language')
        if (saved === 'hi' || saved === 'en') {
          this.currentLang = saved
        }
        document.documentElement.setAttribute('lang', this.currentLang)
      }
    },

    // Get static translation (instant, no API)
    t(key, fallback = key) {
      const translation = this.translations[this.currentLang]?.[key]
      return translation || fallback
    },

    // Translate dynamic text via API (with cache)
    async translateText(text, sourceLang = 'auto') {
      if (!text || text.trim() === '') return text

      const cacheKey = `${this.currentLang}:${text}`
      
      // Return from cache if exists
      if (this.cache[cacheKey]) {
        return this.cache[cacheKey]
      }

      // If already in target language, return as-is
      if (sourceLang === this.currentLang) {
        this.cache[cacheKey] = text
        return text
      }

      try {
        // Use Google Translate free API via MyMemory
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${this.currentLang}`
        const response = await fetch(url)
        const data = await response.json()
        
        if (data.responseStatus === 200 && data.responseData?.translatedText) {
          const translated = data.responseData.translatedText
          this.cache[cacheKey] = translated
          return translated
        }
      } catch (error) {
        console.warn('Translation API error:', error)
      }

      // Fallback: return original text
      this.cache[cacheKey] = text
      return text
    },

    // Batch translate multiple texts
    async translateBatch(texts, sourceLang = 'auto') {
      const promises = texts.map(text => this.translateText(text, sourceLang))
      return await Promise.all(promises)
    },
  },
})
