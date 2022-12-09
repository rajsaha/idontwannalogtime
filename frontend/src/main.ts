import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { plugin, defaultConfig } from "@formkit/vue"
import "./assets/main.css"
import SetupCalendar from "v-calendar"
import { createPinia } from "pinia"
import { generateClasses } from "@formkit/themes"
import theme from "./theme"

const pinia = createPinia()
const app = createApp(App).use(
    plugin,
    defaultConfig({
        config: {
            classes: generateClasses(theme),
        },
    })
)

app.use(router)
app.use(pinia)
app.use(SetupCalendar, {})

app.mount("#app")
