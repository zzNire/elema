<template>
  <div class="shopcar">
    <div class="content">
      <div class="content-left">

        <div class="shopcar-logo">
          <div class="logo">
            <span class="icon-shopping_cart"></span>
          </div>
        </div>
        
      </div>
      <div class="content-middle">
          <div class="price">
           <span> 未选购商品</span>
        </div>
        <div class="description">
            <span>另需配送费{{}}元</span>
        </div>
      </div>
      <div class="content-right">
        <span >￥{{}}起送</span>
        <div class="delivery">

        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {

  }

</script>


<style lang="stylus" scoped>
  @import '../../../common/stylus/mixin.styl';



  .shopcar {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 0;
    width: 100%;
    height: 46px;
    background: rgb(68, 68, 68)

  }
  

  .content {
    display: flex;
    height: 100%;
  }

  .content-left {
    flex: 0 0 56px;
    text-align: left;
  }

  .shopcar-logo {
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background: rgb(54, 54, 53);
    border: solid rgb(68, 68, 68) 6px;

  }

  .logo {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .icon-shopping_cart:before {
    content: "\e907";
    font-size: 28px;
    color: rgb(108, 109, 119);
    line-height: 32px;

  }

.content-middle{
    flex:1
    text-align :left;
    color :rgb(108, 109, 119);
    font-size :12px;
    vertical-align:middle;
    margin-top :5px;
    
    }

.price{
    font-size :80%;
    }

.description{
    font-size :50%;
    }
        
  .content-right {
    flex: 0 0 105px;
    width: 105px;
  }
.content-right{
    color :white;
    line-height :46px;
    }
</style>
