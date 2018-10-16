// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import './common/stylus/style.css';
import 'animate.css'
import vBlur from 'v-blur';
import ASwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';


Vue.use(VueResource);
Vue.use(vBlur);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
  
})

router.push("/goods");

//vue-resource

