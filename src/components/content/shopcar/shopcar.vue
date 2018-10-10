<template>
  <div class="shopcar">
    <div class="content">
      <div class="content-left">

        <div class="shopcar-logo" :class="{'shopcar-logo-hasFood':totalCount>0}">
          <div class="logo">
            <span class="icon-shopping_cart" 
              :class="{'icon-shopping_hasFood':totalCount>0}"></span>
          </div>
          <span class="count" v-if="totalCount>0">{{totalCount}}</span>
        </div>
        
      </div>
      <div class="content-middle">
          <div class="price" :class="{'price-hasFood':totalPrice>0}">
           <span> {{pickDesc}}</span>
        </div>
        
      </div>
      <div class="description">
            <span>另需配送费{{deliveryPrice}}元</span>
        </div>

      <div class="content-right" :class="{'min-hasFood':totalPrice>minPrice}">
        <span >{{payDesc}}</span>
        <div class="delivery">

        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    props:{
      selectFoods:{
        type: Array,
        default(){
          return [];
        }
      },
      deliveryPrice:{
        type: Number,
        default:0,
      },
      minPrice:{
        type: Number,
       default:0,
      }
    },
    computed:{
      totalPrice(){
        let price = 0;
        for(let i=0;i<this.selectFoods;i++)
        {
          price += selectFoods[i].price;
        }
        //return price;
        return 23;
      },
      totalCount(){
        let count = 0;
        for(let i=0;i<this.selectFoods;i++)
        {
          count += selectFoods[i].count;
        }
        //return count;
        return 1;
      },
      stillNeed(){
        let need = this.minPrice-this.totalPrice();
        if(need >0 )
        return need;
        else return 0;
      },
      payDesc(){
        if(this.totalPrice === 0)
        {
          return `￥${this.minPrice}元起送`;
        }
        else if(this.totalPrice < this.minPrice)
        {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        }
        else {
          return "去结算"
        }
      },
      pickDesc(){
        if(this.totalCount>0)
        {
          return `￥${this.totalPrice}`;
        }
        else{
          return "未选购商品";
        }
      }
    }
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
  .shopcar-logo-hasFood{
    background-color : rgb(73,147,247);
    
  }
  .logo {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .count{
    position :absolute;
    top:-8px;
    right:-3px;
    height 18px;
    min-width :18px;
    padding :0 3px;
    font-size :12px;
    line-height :18px;
    text-align :center;
    border-radius :16px;
    color :white;
    background :rgb(240,20,20);
    box-shadow :0 4px 8px 0 rgba(0,0,0,0.4);

  }

  .icon-shopping_cart:before {
    content: "\e907";
    font-size: 28px;
    color: rgb(108, 109, 119);
    line-height: 32px;

  }

  .icon-shopping_hasFood:before{
    color :white;
  }

.content-middle{

    flex:1
    text-align :left;
    height :100%;
    color :rgb(108, 109, 119);
   
    }

.price{
  height :38px;
  line-height :46px;
 vertical-align :middle;
  font-size :16px;
  font-weight :500;
  
}

.price-hasFood{
  color :white;

  
}
.description{
  vertical-align :middle;
   text-align :left;
    color :rgb(108, 109, 119);
    flex :3;
    font-size :13px;
    line-height :46px;
    }
        
  .content-right {
    flex: 0 0 105px;
    width: 105px;
  }
.content-right{
    color :white;
    line-height :46px;
    background :rgb(83,83,85);
    font-size :13px;
    }

    .min-hasFood{
      background :rgb(64,196,120);
    }
</style>
