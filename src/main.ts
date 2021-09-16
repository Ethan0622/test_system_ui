import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import quasarConfig from './plugins/quasar'
import { VueCookieNext } from 'vue-cookie-next'
import cookiesConfig from './plugins/cookies'

const app = createApp(App)

app.use(Quasar, quasarConfig)
app.use(VueCookieNext, cookiesConfig)
app.use(createPinia())
app.use(router).mount('#app')
