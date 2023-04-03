import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { plugin, defaultConfig } from "@formkit/vue"
import "./assets/main.css"
import SetupCalendar from "v-calendar"
import "v-calendar/style.css"
import { createPinia } from "pinia"
import { generateClasses } from "@formkit/themes"
import theme from "./theme"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import {
    faCalendarDays,
    faPenToSquare,
    faTrashCan,
} from "@fortawesome/free-regular-svg-icons"
import {
    faArrowLeft,
    faArrowRight,
    faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons"

library.add(faPenToSquare)
library.add(faTrashCan)
library.add(faArrowLeft)
library.add(faArrowRight)
library.add(faCalendarDays)
library.add(faArrowRightFromBracket)

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
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount("#app")
