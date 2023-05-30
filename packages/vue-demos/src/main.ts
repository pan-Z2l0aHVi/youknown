import { createApp } from 'vue'
import 'vant/lib/index.css'
import App from './App.vue'
import { Tab, Tabs, Button } from 'vant'
import router from './router'

createApp(App).use(router).use(Button).use(Tab).use(Tabs).mount('#app')
