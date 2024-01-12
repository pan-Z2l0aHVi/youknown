import 'virtual:uno.css'
import 'vant/lib/index.css'
import '@/assets/reset.scss'

import { Button, Cell, Switch, Tab, Tabs } from 'vant'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

createApp(App).use(router).use(Button).use(Tab).use(Tabs).use(Cell).use(Switch).mount('#app')
