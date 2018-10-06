import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import goods from '../components/content/goods.vue'
import ratings from '../components/content/ratings.vue'
import seller from '../components/content/seller.vue'

Vue.use(Router)

export default new Router({
  routes: [
   /* {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },*/
    {
      path:'/goods',
      name:"goods",
      component:goods,
    },
    {
      path:'/ratings',
      name:"ratings",
      component:ratings,
    },
    {
      path:'/seller',
      name:"seller",
      component:seller,
    },
  ]
});
