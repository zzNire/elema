<template>
  <div class="shop-contral">
    <transition name="move">
        <div class="cart-decrease"  v-if="food.count">
            <span class="decrease icon-remove_circle_outline" 
             @click="cancleFood"></span>
        </div>
    </transition>
    <transition name="price">
    <span class="count" v-if="food.count">{{food.count}}</span>
    </transition>
    <span class="add icon-add_circle" @click="buyFood"></span>
  </div>
</template>


<script>
  export default {
    props: {
      food: {
        type: Object,
        required: true,
      },
    },
    methods: {
      buyFood() { 
        console.log(event.target);
         this.$emit("selectFood",event.target);
        if (!this.food.count) {
          this.$set(this.food, 'count', 1);

        } else
         { 
             this.food.count++;
             }

       
        console.log('food' + this.food.count);
       
      },
      cancleFood() {
        this.food.count--;
         //this.$emit("selectFood",this.food.count)
      },
    },
    
  }

</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/mixin.styl';

.shop-contral {
  height :24px;
    display: flex;
    font-size: 0px;
   
    vertical-align :middle;
  }

.cart-decrease{
  height :24px;
  width :24px;
    display :inline-block;
    

}
.decrease {
   height :24px;
  width :24px;
    display: inline-block;
    font-size: 24px;
     line-height :24px;
    color: #4993f7;
    transform :rotate(0);
    transition :all 0.4s linear;
    vertical-align :middle;
   
  }

.move-enter , .move-leave-to{
    opacity: 0
    transform :translateX(24px);
  } 

.move-enter .decrease  {
    transform :rotate(0);
}

.move-leave-to .decrease{
    transform :rotate(0);
    }

.move-enter-active , .move-leave-active{
    transition:all 0.4s linear;
  }

.move-enter-to ,.decrease {
    transform :rotate(180deg);
    }

.move-leave .decrease{
    transform :rotate(180deg);
    }

.move-enter-to,.move-leave {
    opacity: 1 ;
    transform:translateX(0);
  }


  .price-enter , .peice-leave-to{
    opacity: 0
    transform :translateX(24px);
  } 


.price-enter-active , .price-leave-active{
    transition:all 0.4s linear;
  }


.price-enter-to,.price-leave {
    opacity: 1 ;
    transform:translateX(0);
  }

  .icon-remove_circle_outline:before {
    content: "\e906";
  }

  .count {
    font-size: 12px;
    display: inline-block;
    width: 24px;
    text-align: center;
    line-height: 24px;

  }

  .add {
    
     height :24px;
    width :24px;
    display: inline-block;
    font-size: 24px;
    color: #4993f7;
    line-height :24px;
  }

  .icon-add_circle:before {
    content: "\e900";
  }

</style>
