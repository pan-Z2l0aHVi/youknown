import { createApp } from 'vue'
import 'vant/lib/index.css'
import App from './App.vue'
import { Tab, Tabs, Button, Cell, Switch } from 'vant'
import router from './router'

createApp(App).use(router).use(Button).use(Tab).use(Tabs).use(Cell).use(Switch).mount('#app')
