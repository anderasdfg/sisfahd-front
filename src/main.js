import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate';
import vuetify from './plugins/vuetify';
<<<<<<< HEAD
import axios from 'axios';
=======
import axios from 'axios'
import VueAxios from 'vue-axios';
>>>>>>> 634b7e9798d4e79c524fe81fd7a6fb9f4aff9d3e

Vue.use(Vuelidate);
Vue.config.productionTip = false
Vue.use(VueAxios, axios);

axios.defaults.baseURL = "http://localhost:53170/api";

// axios.interceptors.request.use(config => {

//     if (localStorage.getItem("token")) {

//         config.headers.common.Authorization = "Bearer " + localStorage.getItem("token");
//     }

//     return config;
// });

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
