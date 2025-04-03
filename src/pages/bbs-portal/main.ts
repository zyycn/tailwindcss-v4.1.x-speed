import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import 'modern-normalize/modern-normalize.css'
import './styles/index.scss'
import './styles/tailwind.css'

const app = createApp(App)
app.use(router)

app.mount('#app')
