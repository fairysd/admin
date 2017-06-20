// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min'
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import router from './router'
import VeeValidate from 'vee-validate';
// import zh_CN from 'vee-validate/dist/locale/zh_CN'
// Validator.addLocale(zh_CN)
Vue.use(VeeValidate);
Vue.use(Vuex);
Vue.use(VueResource);
import global_ from './components/Global'
Vue.prototype.GLOBAL = global_

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',  
  router,
  template: '<App/>', 
  components: { App }
})