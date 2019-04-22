import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import ui from './components/ui'

Vue.use(VueRouter)

for (let prop in ui) {
  Vue.component('ui-' + prop.toLowerCase(), ui[prop])
}

const router = new VueRouter({ mode: 'history', routes: routes })

new Vue({
  el: '#app-root',
  router,
  render: h => h(require('./components/app/app.vue.html').default)
})
