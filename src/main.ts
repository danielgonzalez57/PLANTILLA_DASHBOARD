

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './index.css'
import 'flowbite/dist/flowbite.css'
import '@bhplugin/vue3-datatable/dist/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
