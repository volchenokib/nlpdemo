import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

// TODO:
// + удалить лого econphysica
// - in Eng
// + eslint
// - make the correct gitignore file
// - оформить repo
// - try auto code review
// - настроить загрузку файлов с firebase
