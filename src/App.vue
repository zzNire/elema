<template>
  <div id="app">

    <div class="header" ref="header" :class="{'backgroundBlur':backgroundBlur}">
      <my-header :seller="seller" @changeZIndex="changeZIndex">
        <p>test</p>
      </my-header>
    </div>

    <div class="menu" :class="{'backgroundBlur':backgroundBlur}">

      <div class="tab">
        <div class="tab-item">
          <router-link to="/goods">点餐</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/ratings">评论</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/seller">商家</router-link>
        </div>
      </div>
      <div class='line'></div>
    </div>

    <div class="content">
      <transition :name="transitionName">
        <keep-alive>
          <router-view class="router-view" :seller="seller" @appBlur="appBlur"></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script type="text/esmascript-6">
  import myHeader from './components/header/header.vue';
import {urlParse} from './common/js/utl.js';
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
 
// require styles
import 'swiper/dist/css/swiper.css'
 
Vue.use(VueAwesomeSwiper, /* { default global options } */)

const ERR_OK = 0;
export default {
  name: 'App',
  data(){
    return{
      seller:{
        id: (()=>{
          let queryParam = urlParse();
           console.log("param-id");
          console.log(queryParam.id);
          return queryParam.id;
        })()
      },
      backgroundBlur:false,
      transitionName:'',
      map:{},
    };
  },
  components:{
    myHeader,
  },
  created(){
    this.$http.get('/api/seller?id='+this.seller.id).then(response =>{
      response = response.body;
      if(response.errno === ERR_OK)
      {
          //this.seller = response.data;
          this.seller = Object.assign({},this.seller,response.data);
          console.log(this.seller);
       
      }
     
    },response => {

    });
  },
  methods:{
    changeZIndex(zindex){
      //this.$refs.header.style.zIndex = zindex;
    },

    appBlur(tag){
          console.log("app blur");
          this.backgroundBlur = tag;   
      },
  },
  watch: {  
    '$route' (to, from) { 
      console.log( "tofrom"); 
       console.log( this.transitionName === ''); 
      if(this.transitionName === '')
      {
         this.transitionName = 'slide-forward';
          if (!this.map[to.path]) {
          this.map[to.path] = +new Date() + 1;
        }
        if (!this.map[from.path]) {
          this.map[from.path] = +new Date();
       }
      }
      else
     {
      if (!this.map[to.path]) {
          this.map[to.path] = +new Date() + 1;
        }
        if (!this.map[from.path]) {
          this.map[from.path] = +new Date();
       }

       if (this.map[to.path] > this.map[from.path]) {
         this.transitionName = 'slide-forward';
          console.log( this.transitionName);
        } else {
          this.transitionName = 'slide-back';
         console.log( this.transitionName);
       } 
      
     }
    }  
  }

}
</script>



<style lang="stylus">
  @import "./common/stylus/mixin.styl";

  #app {
    font-family: 'PingFang SC', 'STHeitiSC-Light', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    

  }

  .backgroundBlur {
    filter: blur(5px);
  }

  .header {}

  .menu {


    margin-top: 5px;

  }

  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;

  }

  .tab-item {
    flex: 1;
    text-align: center;

  }

  .tab-item>a {
    position: relative;
    display: block;
    font-size: 14px;
    color: rgb(77, 85, 93);

  }

  .tab-item>a.router-link-active:before {
    position: absolute;
    left: 30%;
    bottom: 0px;
    content: "";
    width: 40%;
    border-bottom: 2px solid rgb(73, 147, 247);


  }

  .content {}

  .line {
    border-1px(rgba(7, 17, 27, 0.1))
  }

  .router-view {}

  .slide-forward-enter {
    transform: translate(100%);
  }

  .slide-forward-enter-active {
    transition: all 0.5s ease-in-out;
  }

  .slide-forward-leave-active {
    transform: translate(-100%);
    transition: all 0.5s ease-in-out;
  }


  .slide-back-enter {
    transform: translate(-100%);
  }

  .slide-back-enter-active {
    transition: all 0.5s ease-in-out;
  }

  .slide-back-leave-active {
    transform: translate(100%);
    transition: all 0.5s ease-in-out;
  }

</style>
