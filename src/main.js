import { createApp } from 'vue'
import router from './routes'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import { createClient } from 'villus'
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

import { Quasar, Notify } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'

import App from './App.vue'

const client = createClient({url: API_ENDPOINT})
const pinia = createPinia()
const app = createApp(App)

pinia.use(piniaPersist)
app.use(client)
app.use(Quasar, {
  plugins: {
    Notify
  },
})
app.use(router)
app.use(pinia)

app.mount('#app')
