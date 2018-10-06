<template>
    <div class="header">
        <div class="content">
            <div class="icon"> 
                <img :src="seller.avatar" height="64" width="64">
            </div>
            <div class='message'>
                <div class="title">
                     <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
               <div class="detals">
                    <span>评价{{seller.score}}</span>
                    <span>月售{{seller.sellCount}}单</span>
                    <span>{{seller.description}}约{{seller.deliveryTime}}分钟</span>
               </div>
               <div>
               </div>
               <div class="sale" v-if="seller.supports" >
                   <div class="sale-left">
                        <span class="sale-icon" :class="saleType[seller.supports[0].type]"></span>
                        <span class="sale-info">{{seller.supports[0].description}}</span>
                   </div>
                  
                   <div> 
                       <button class="sale-more-info" v-if="supportsNum>1">{{supportsNum}}个优惠></button>
                   </div>
               </div>
            </div>
        </div>
        <div class="comment"></div>
    </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
        saleType:['decrease','discount','special','invoice','guarantee']
    }
  },
  computed: {
    supportsNum() {
      return this.seller.supports.length;
    },
    saleIcon(){
       if( this.seller.supports[0].type == 0)
       {
           return "decrease_4";
       }
       else return '';
    }
  }
};
</script>

<style lang="stylus" scoped>
//C:\elema\src\common\stylus\style.styl
//C:\elema\src\components\header\header.vue
@import "../../common/stylus/mixin.styl";
.header {
}
.content {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.icon img {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

.title {
  margin-bottom: 8px;
}
.name {
  font-size: 16px;
  font-weight: bold;
  line-height: 18px;
}
.detals {
  color: gray;
  font-size: 6px;
  font-weight: 400;
  margin-bottom: 8px;
}
.detals span{
    margin-right:5px;
    margin-left :5px;
    }

.sale {
  display: flex;
  justify-content: space-between;
  font-size: 6px;
  margin-bottom: 8px;
 
}

.sale-icon{
    display: inline-block;
    width: 15px;
    height: 15px;
    background-size :15px 15px;
    background-repeat:no-repeat;
    vertical-align :sub;
}
.decrease
{
       bg-image('decrease_3');
}
.discount
{
       bg-image('discount_3');
}
.special
{
       bg-image('special_3');
}
.invoice
{
       bg-image('invoice_3');
}
.guarantee
{
       bg-image('guarantee_3');
}

.sale-more-info {
  font-size: 6px;
}
</style>
