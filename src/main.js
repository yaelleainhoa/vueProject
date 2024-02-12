import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import Page1 from "./App.vue"
import Page2 from "./components/RecipePage.vue"

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '', component: Page1, name: "gallery" },
      { path: '/recipe/:id', component: Page2, name: "recipe" },
      { 
        path: '/:catchAll(.*)', 
        redirect: to => ({ path: '/' }), 
      },
    ]
  })

app.use(router)
app.mount('#app')