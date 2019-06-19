import Vue from 'vue';
import Router from 'vue-router';
import VueMaterial from 'vue-material';
import VeeValidate from 'vee-validate';
import VueCookies from 'vue-cookies'
import router from './router';
import App from './App.vue';


import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/black-green-light.css';

Vue.use(VueMaterial);
Vue.use(VeeValidate);
Vue.use(VueCookies);
Vue.config.productionTip = false


Vue.prototype.$API_URL = 'https://reqres.in'

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
