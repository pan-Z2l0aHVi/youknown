import { createApp } from 'vue'
import '@youknown/css/src/common-vars.scss'
import 'virtual:uno.css'
import 'vant/lib/index.css'
import '@/assets/reset.scss'
import App from './App.vue'
import { Tab, Tabs, Button, Cell, Switch } from 'vant'
import router from './router'

createApp(App).use(router).use(Button).use(Tab).use(Tabs).use(Cell).use(Switch).mount('#app')
