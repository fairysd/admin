import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import hospital from '@/components/hospital'
import partment from '@/components/partment'

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
    }
  ]
})
