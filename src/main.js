import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate';
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios';

Vue.use(Vuelidate);
Vue.config.productionTip = false
Vue.use(VueAxios, axios);

axios.defaults.baseURL = "http://localhost:64258/api";

axios.interceptors.request.use(config => {

    if (localStorage.getItem("token")) {

        config.headers.common.Authorization = "Bearer " + localStorage.getItem("token");
    }

    return config;
});


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
