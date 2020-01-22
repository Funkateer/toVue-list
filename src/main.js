import Vue from 'vue'
import 'vue-material/dist/vue-material.min.css';
import App from './App.vue'
import VueMaterial from 'vue-material'

Vue.use(VueMaterial);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

