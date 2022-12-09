import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { plugin, defaultConfig } from "@formkit/vue"
import "./assets/main.css"
import "@formkit/themes/genesis"
import SetupCalendar from "v-calendar"
import { createPinia } from "pinia"

const pinia = createPinia()
const app = createApp(App).use(plugin, defaultConfig)

app.use(router)
app.use(pinia)
app.use(SetupCalendar, {})

app.mount("#app")
