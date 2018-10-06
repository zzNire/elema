<template>
  <div id="app">

    <div class="header">
      header
      <my-header> 
        <p>test</p>
      </my-header>
    </div>

     <div class='line'></div>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods" >商品</router-link>
      </div>
      <div class="tab-item">
         <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
         <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class='line'></div>

    <div class="content"> 
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import myHeader from './components/header/header.vue'

export default {
  name: 'App',
  components:{
    myHeader,
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
  display: block;
  font-size: 14px;
  color: rgb(77, 85, 93);
 
}

.tab-item > a.router-link-active {
  color: rgb(240, 20, 20);

}

.line{
  width: 100%;
  height: 1px;
  background-color: rgb(7, 17, 27,0.1);
}
</style>
