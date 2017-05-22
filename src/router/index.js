import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import hospital from '@/components/Hospital/hospital'
import partment from '@/components/Partment/partment'
import products from '@/components/products'
import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/hospital',
      name: 'hospital',
      component: hospital
    },
    {
      path: '/partment',
      name: 'partment',
      component: partment
    },
    {
      path: '/products',
      name: 'products',
      component: products
    }
  ]
})
