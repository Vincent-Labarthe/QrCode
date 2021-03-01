import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store';

axios.defaults.withCredentials = false
axios.defaults.headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
axios.defaults.baseURL = 'http://127.0.0.1:8000/';

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Vuex)


new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
