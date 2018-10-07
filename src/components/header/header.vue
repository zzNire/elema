<template>
    <div class="header">
      <div class="icon"> 
                <img :src="seller.avatar" height="64" width="64">
            </div>
      <div class="background">
        <div class="content">
            
            <div class='message'>
                <div class="title">
                     <span class="brand"></span>
                    <span class="name"  @click="showDetail">{{seller.name}}</span>
                </div>
               <div class="detals">
                    <span>评价{{seller.score}}</span>
                    <span>月售{{seller.sellCount}}单</span>
                    <span>{{seller.description}}约{{seller.deliveryTime}}分钟</span>
               </div>
               <div>
               </div>
               <div class="sale" v-if="seller.supports" @click="showDetail">
                   <div class="sale-left">
                        <span class="sale-icon" :class="saleType[seller.supports[0].type]"></span>
                        <span class="sale-info">{{seller.supports[0].description}}</span>
                   </div>
                  
                   <div> 
                       <button class="sale-more-info" v-if="supportsNum>1">{{supportsNum}}个优惠></button>
                   </div>
               </div>
               <div class="report"  @click="showDetail">
                 公告：{{seller.bulletin}}
               </div>
            </div>
        </div>
      </div>
        <div class="header-background">
          <img :src="seller.avatar">
        </div>

        <div v-show="infoShow"  class="seller-info">
            <div class="detail-wrapper clearfix">
              <div class="info-main" >
                <p>{{seller.bulletin}}</p>
                <p>{{seller.bulletin}}</p>
                <p>{{seller.bulletin}}</p>
                <p>{{seller.bulletin}}</p>
                <p>{{seller.bulletin}}</p>
                
              </div>
            </div>
            <div class="info-close">
              <i class="icon-close"></i>
            </div> 
        </div>
         
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
      saleType: ["decrease", "discount", "special", "invoice", "guarantee"],
      infoShow: false
    };
  },
  computed: {
    supportsNum() {
      return this.seller.supports.length;
    },
    saleIcon() {
      if (this.seller.supports[0].type == 0) {
        return "decrease_4";
      } else return "";
    }
  },
  methods: {
    showDetail() {
      this.infoShow = true;
    }
  }
};
</script>

<style lang="stylus" scoped>

@import '../../common/stylus/mixin.styl';

.header {
  padding-top: 100px;
  height: 230px;
  position: relative;
}

.header-background {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.header-background img {
  width: 100%;
  height: auto;
  background-size: cover;
  filter: blur(10px);
}

.background {
  left: 0px;
  padding-bottom: 10px;
  background-color: white;
  padding-top: 30px;
}

.content {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.icon {
  width: 100%;
  position: absolute;
  top: 50px;
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

.detals span {
  margin-right: 5px;
  margin-left: 5px;
}

.sale {
  display: flex;
  justify-content: space-between;
  font-size: 6px;
  margin-bottom: 8px;
}

.sale-icon {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-size: 15px 15px;
  background-repeat: no-repeat;
  vertical-align: sub;
}

.decrease {
  bg-image('decrease_3');
}

.discount {
  bg-image('discount_3');
}

.special {
  bg-image('special_3');
}

.invoice {
  bg-image('invoice_3');
}

.guarantee {
  bg-image('guarantee_3');
}

.sale-more-info {
  font-size: 6px;
}

.report {
  margin: 0px;
  font-size: 6px;
  color: gray;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  margin-bottom: 8px;
}

.seller-info {
  height: 100%;
  width: 100%;
  position: fixed;
  background: rgba(7, 17, 27, 0.8);
  top: 0px;
  left: 0px;
  color :white;
  overflow:auto;
}

.detail-wrapper {
  min-height: 100%;
}

.info-main {
  margin-top: 64px;
  padding-bottom :64px;
}

.info-close{
  
  }
.icon-close {
  display :block;
 position:relative;
  height: 32px;
  width: 32px;
  font-size :32px;
  margin :-64px auto 0 auto;
  clear:both;

}
</style>
