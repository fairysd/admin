// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min'
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(VueResource);
import global_ from './components/Global'
Vue.prototype.GLOBAL = global_

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',  
  template: '<App/>', 
  components: { App }
})