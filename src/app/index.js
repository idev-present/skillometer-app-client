// init core
import { createApp } from 'vue'
import App from '@/app/App.vue'

const app = createApp(App)

// init plugins
import { createPinia } from 'pinia'
import router from '@/app/router/index.js'

app.use(createPinia())
app.use(router)

// init styles
import '@/app/assets/styles/tailwind.css'

// init middlewares

app.mount('#app')
