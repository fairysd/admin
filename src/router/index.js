import Vue from 'vue'
import Router from 'vue-router'
import VueValidator from 'vue-validator'
import Hello from '@/components/Hello'
import container from '@/components/content'
import login from '@/components/login'
import hospital from '@/components/Hospital/hospital'
import partment from '@/components/Partment/partment'
import vendors from '@/components/Vendors/Vendors'
import vendorUnits from '@/components/VendorUnits/vendorUnits'
import products from '@/components/Products/products'
import user from '@/components/User/user'

Vue.use(VueValidator)
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      component: login,  
    },
    {
      path: '/Setting',
      component: container,
      children:[
        {
          path:'',
          component:Hello
        },
        {
          path: '/Setting/HospitalSetting/List',
          component: hospital
        },
        {
          path: '/Setting/HospitalSetting/UnitList',
          component: partment
        },
        {
          path: '/Setting/VendorSetting/Vendors',
          component: vendors
        },
        {
          path: '/Setting/VendorSetting/VendorUnits',
          component: vendorUnits
        },
        {
          path: '/Setting/Product/Index',
          component: products
        },
        {
          path: '/Setting/User/Index',
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
