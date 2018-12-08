import Vue from 'vue'
import App from './components/App'
import store from './js/store'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'
// import 'vue-awesome/icons/flag'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import Snotify from 'vue-snotify'
import 'vue-snotify/styles/material.css'
import Dialog from './components/Dialog.vue'
Vue.component('G-Dialog', Dialog)
Vue.component('v-icon', Icon)
Vue.use(ElementUI, { locale })
Vue.use(Snotify)
Vue.config.productionTip = false
new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
