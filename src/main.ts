import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import quasarConfig from './plugins/quasar'
import { VueCookieNext } from 'vue-cookie-next'
import cookiesConfig from './plugins/cookies'
import piniaPluginPersist from 'pinia-plugin-persist'

const app = createApp(App)
const store = createPinia()
store.use(piniaPluginPersist)

app.use(Quasar, quasarConfig)
app.use(VueCookieNext, cookiesConfig)
app.use(store)
app.use(router).mount('#app')
