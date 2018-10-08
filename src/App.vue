<template>
  <div id="app">

    <div class="header">
      <my-header :seller="seller"> 
        <p>test</p>
      </my-header>
    </div>

  <div class="menu">
  
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods" >点餐</router-link>
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
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/esmascript-6">
import myHeader from './components/header/header.vue'

const ERR_OK = 0;
export default {
  name: 'App',
  data(){
    return{
      seller:{},

    };
  },
  components:{
    myHeader,
  },
  created(){
    this.$http.get('/api/seller').then(response =>{
      response = response.body;
      if(response.errno === ERR_OK)
      {
          this.seller = response.data;
          console.log(this.seller)
      }
     
    },response => {

    });
  },

}
</script>



<style  lang="stylus">
@import "./common/stylus/mixin.styl";

#app {
  font-family: 'PingFang SC','STHeitiSC-Light','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu{
  margin:5px 0 5px 0;
}
.tab {
  display:flex;
  width: 100%;
  height:40px;
  line-height: 40px;
}
.tab-item {
  flex: 1;
  text-align: center;
}

.tab-item > a {
  position :relative;
  display: block;
  font-size: 14px;
  color: rgb(77, 85, 93);
 
}

.tab-item > a.router-link-active:before{
  position :absolute;
  left :30%;
  bottom :0px;
  content :"";
  width :40%;
  border-bottom :2px solid rgb(73,147,247);
  
  

}

.line{
  border-1px(rgba(7, 17, 27,0.1))
}
</style>
