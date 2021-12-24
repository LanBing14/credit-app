
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import fileHost from 'api/apiUrl'
import * as filters from 'filters/filters.js' // global filters

Vue.config.productionTip = false
Vue.prototype.website = fileHost.fileHost
Vue.prototype.$onLaunched = new Promise(resolve => {
    Vue.prototype.$isResolve = resolve
})

// 添加全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
