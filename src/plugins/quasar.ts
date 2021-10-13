import '../styles/quasar.scss'
import '../styles/general.scss'
import '@quasar/extras/material-icons/material-icons.css'
import { Dialog, Notify, AppFullscreen } from 'quasar'
import znCN from 'quasar/lang/zh-CN.js'

// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: { Dialog, Notify, AppFullscreen },
  lang: znCN,
}
