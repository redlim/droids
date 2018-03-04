import Vue from 'vue'
import Router from 'vue-router'
import SedMap from '@/components/Main'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: SedMap
    }
  ]
})
