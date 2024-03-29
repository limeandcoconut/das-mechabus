import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import createApp from './create-app.js'
import { gaDevId as gaDevelopmentId, gaProductionId } from '../config/config.js'
import { isProd } from './utils'

const { app, router } = createApp()

Vue.use(VueAnalytics, {
  id: isProd() ? gaProductionId : gaDevelopmentId,
  router,
})

if (isProd() && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope)
    }, error => {
      console.log('ServiceWorker registration failed: ', error)
    })
  })
}

router.onReady(() => {
  app.$mount('#app')
})
