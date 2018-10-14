<template>
  <div class="food-content" ref="foodWrapper"> 
    <div class="food-scroll">

      <div class="content-food">
        <div class="food-img">
          <img :src="food.image">
          <span class="icon-arrow_lift" @click="returnback"></span>
        </div>
        <div class="detial">
          <p>{{food.name}}</p>
          <div class="food-sell-rate">
            <span class="food-sellcount">月售{{food.sellCount}}份</span>
            <span class="food-rating">好评率{{food.rating}}%</span>
          </div>
          <div class="food-contral">
            <span class="food-price">￥{{food.price}}</span>
            <span class="food-normal-price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
            <shopcar-contral :food="food"  @selectFood="selectFood"> </shopcar-contral>
          </div>

        </div>
      </div>
      <div class="food-description" v-if="food.info">
          <p>商品介绍</p>
        {{food.info}}
      </div>

      <div class="ratings">
        <p>商品评价</p>
        <rating-compoment :ratings="food.ratings"
        :desc="desc" :selctType="selctType" :onlyContent="onlyContent"
        ref="myreatingCompoment">

        </rating-compoment>
      </div>

    </div>
  </div>
</template>


<script>
  import shopcar from "../shopcar/shopcar.vue";
  import shopcarContral from "../../shopcarContral/shopcarContral.vue";
  import ratingCompoment from "../../ratings/ratingCompoment.vue";
import BScroll from 'better-scroll';
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 3;
  export default {
    components: {
      shopcar,
      shopcarContral,
      ratingCompoment,
    },
    data(){
        return {
            desc:{
                 all:'全部',
                positive:"推荐",
                negative:"吐槽",
            },
            onlyContent:true,
            selctType:ALL,
        }
    },
    props: {
      food: {
        type: Object,
        required: true,
      },
      showTag:{
          type:Boolean,
          required:true,
      },
      
    },
    methods: {
      returnback() {
        this.$emit("hideDetial", false);
        this.$refs.myreatingCompoment.onlyContent = true;
      },

      
      selectFood(target) {
        //this._drop(target);
        this.$emit("startDrop",target);
      },  
     
    },
    watch:{
        showTag(){
            console.log("showTag change");
            this.$nextTick(()=>{
                if(this.foodScroll)
                {
                    this.foodScroll.refresh();
                }
                else{
                    let list = this.$refs.foodWrapper;
                    this.foodScroll = new BScroll(list,{
                        click:true,
                    });
                }
            });
        }
    }
  }

</script>


<style lang="stylus" scoped>
  @import '../../../common/stylus/mixin.styl';

  .food-content {
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 46px;
    z-index: 0;
  background :#f3f5f7;
  }

.content-food{
  background: white;
  
}
  .food-img {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }

  .food-img img {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    object-fit: cover;


  }

  .icon-arrow_lift:before {
    content: "\e901";
  }

  .icon-arrow_lift {
    position: absolute;
    top: 5px;
    left: 0px;
    color: white;
    padding: 10px;

  }

  .detial {
    text-align: left;
    padding : 18px;
  }

  .detial p {
    font-size: 20px;
    font-weight: 700;
    color: black;
  }

  .food-sell-rate {
    font-size: 12px;
    color: gray;
    line-height: 12px;
    margin: 5px 0;
  }

  .food-price {
    color: rgb(253, 96, 69);
    font-size: 18px;

  }

  .food-normal-price {
    font-size: 12px;
    color: rgb(147, 153, 159);
    text-decoration: line-through;
  }

  .food-contral {
    position: relative;
    margin-top: 18px;
  }

  .shop-contral {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }

.food-description{
    margin-top :16px;
    padding :18px;
    font-size :12px;
    line-height :24px;
    text-align :left;
    background :white;
    color :rgb(77,86,93);
}

.food-description p{
    color :black;
}
.ratings{
    padding :18px;
    margin-top:16px;
    background :white;
    text-align :left;

}

.ratings p{
    color :black;
}
</style>
