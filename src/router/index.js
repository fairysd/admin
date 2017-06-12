import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import container from '@/components/content'
import login from '@/components/login'
import hospital from '@/components/Hospital/hospital'
import partment from '@/components/Partment/partment'
import products from '@/components/Products/products'
import user from '@/components/User/user'
import VueResource from 'vue-resource';
import Vuex from 'vuex';
Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(Router);



export default new Router({
  routes: [
    {
      path: '/',
      component: container,  
    },
    {
      path: '/container',
      component: container,
      children:[
        {
          path:'',
          component:Hello
        },
        {
          path: '/container/hospital',
          component: hospital
        },
        {
          path: '/container/partment',
          component: partment
        },
        {
          path: '/container/products',
          component: products
        },
        {
          path: '/container/user',
          component: user
        }
      ]
    },
    {
      path: '/login',
      component: login,  
    }    
  ]
})
