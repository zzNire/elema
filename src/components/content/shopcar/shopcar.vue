<template>
  <div class="shopcar">
    <div class="content" @click="togglelList">
      <div class="content-left">

        <div class="shopcar-logo" :class="{'shopcar-logo-hasFood':totalCount>0 ,'logo-animation':logoAnimation}" ref="shopcarLogo">
          <!-- 通过绑定ligo-ainimation 来实现点击触发缩放动画-->
          <div class="logo">
            <span class="icon-shopping_cart" :class="{'icon-shopping_hasFood':totalCount>0}"></span>
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

      <div class="content-right" :class="{'min-hasFood':totalPrice>=minPrice}"
        @click.stop.prevent="payAll">
        <span>{{payDesc}}</span>
        <div class="delivery">

        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition v-for="(ball,index) in balls" :key="index" name="drop-ball" @before-enter="beforeDrop" @enter="dropping"
        @after-enter="afterDrop">
        <div class="ball" v-show="ball.show" :css="false">
          <div class="inner-hook" :class="index"></div>
        </div>
      </transition>
    </div>
    <transition name="list">
      <div class="good-list" v-show="showList">
        <div class="list-header">
          <span class="list-name">购物车</span>
          <span class="clear" @click="emptyGoods">清空</span>
        </div>
        <div class="list-content" ref="listWrapper">
          <ul class="list-ul">
            <li class="list-li" v-for="selectgood in selectFoods">
              <span class="selectgood-name">{{selectgood.name}}</span>
              <span class="selectgood-price">￥{{selectgood.price * selectgood.count}}</span>
              <shopcar-contral :food="selectgood" class="selectgood-control" @selectFood="ballDrop"></shopcar-contral>
            </li>
          </ul>

        </div>
      </div>
    </transition>
    <transition name="shadow">
      <div class="list-shadow" v-show="showList"
      @click="togglelList"
      v-blur="isBlurred"></div>
    </transition>
  </div>
  
</template>


<script>
  import BScroll from 'better-scroll'
  import ball from "./ball.vue";
  import shopcarContral from "../../shopcarContral/shopcarContral.vue"

  export default {
    components: {
      ball,
      shopcarContral,
    },
    data() {
      return {
        balls: [{
            show: false,
          },
          {
            show: false,
          },
          {
            show: false,
          },
          {
            show: false,
          },
          {
            show: false,
          },

        ],
        dropBall: [],
        logoAnimation: false,
        showList: false,
         isBlurred: true,
      }
    },
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0,
      },
      minPrice: {
        type: Number,
        default: 0,
      }
    },

    computed: {
      totalPrice() {
        let price = 0;
        for (let i = 0; i < this.selectFoods.length; i++) {
          price += this.selectFoods[i].price * this.selectFoods[i].count;
        }
        return price;

      },
      totalCount() {
        let count = 0;
        for (let i = 0; i < this.selectFoods.length; i++) {
          count += this.selectFoods[i].count;
        }
        return count;

      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return "去结算"
        }
      },
      pickDesc() {
        if (this.totalCount > 0) {
          return `￥${this.totalPrice}`;
        } else {
          return "￥0";
        }
      },

    },
    methods: {
      togglelList() {
        
        console.log("show");
        if (!this.totalCount) {
          return;
        }
        this.showList = !this.showList;
        if (this.showList) {
          console.log("scroll");
          this.$emit("blurBk",true);
          if (!this.listScroll) {
            this.$nextTick(() => {
              let list = this.$refs.listWrapper;
              this.listScroll = new BScroll(list, {
                click: true,

              });
            });

          }
          else{
            this.$nextTick(()=>{
              console.log("refresh");
              this.listScroll.refresh();
            });
            
          }

        }
        else{
          this.$emit("blurBk",false);
        }
      },
      ballDrop(el) {
        console.log(el);
        let logo = this.$refs.shopcarLogo;
        this.logoAnimation = true;

        console.log(logo);
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBall.push(ball)
            return
          }
        }

      },
      beforeDrop(el) {

        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            // 获得点击处相对于浏览器的位置

            let rect = ball.el.getBoundingClientRect()
            // 小球要移动的横坐标
            let x = rect.left - 32
            // 小球要移动的纵坐标
            let y = -(window.innerHeight - rect.top - 22)
            el.style.webkitTransform = 'translate3d(0,' + y + 'px,0)'
            el.style.transform = 'translate3d(0,' + y + 'px,0)'
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = 'translate3d(' + x + 'px,0,0)'
            inner.style.transform = 'translate3d(' + x + 'px,0,0)'
          }
        }
      },
      dropping(el) {

        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        });




      },
      afterDrop(el) {
        this.logoAnimation = false;
        let ball = this.dropBall.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }


      },
      emptyGoods(){
        for(let i=0;i<this.selectFoods.length;i++)
        {
          this.selectFoods[i].count = 0;

        }
        this.showList = false;
      },

      payAll(){
        console.log("PAY");
        if(this.totalPrice < this.minPrice)
        {
          return;
        }
        alert("需要支付"+this.totalPrice+"元");
      }


    },
    watch: {

    },


  }

</script>


<style lang="stylus" scoped>
  @import '../../../common/stylus/mixin.styl';


  ul {
    list-style-type: none;
    padding: 0;
  }

  .shopcar {

    position: fixed;
    left: 0;
    bottom: 0;

    width: 100%;
    height: 46px;
 
   
  }


  .content {
    width:100%;
    position :absolute;
    display: flex;
    height: 100%;
    z-index :100;
    background: rgb(68, 68, 68);
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

  .shopcar-logo-hasFood {
    background-color: rgb(73, 147, 247);

  }

  .logo-animation {
    animation: bounce-in 0.4s;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(0.8);
    }

    100% {
      transform: scale(1);
    }
  }

  .logo {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .count {
    position: absolute;
    top: -8px;
    right: -3px;
    height 18px;
    min-width: 18px;
    padding: 0 3px;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    border-radius: 16px;
    color: white;
    background: rgb(240, 20, 20);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);

  }

  .icon-shopping_cart:before {
    content: "\e907";
    font-size: 28px;
    color: rgb(108, 109, 119);
    line-height: 32px;

  }

  .icon-shopping_hasFood:before {
    color: white;
  }

  .content-middle {

    flex: 1;
    text-align: left;
    height: 100%;
    color: rgb(108, 109, 119);
   
  }

  .price {
    height: 38px;
    line-height: 46px;
    vertical-align: middle;
    font-size: 16px;
    font-weight: 500;

  }

  .price-hasFood {
    color: white;


  }

  .description {
    vertical-align: middle;
    text-align: left;
    color: rgb(108, 109, 119);
    flex: 3;
    font-size: 13px;
    line-height: 46px;
    background: rgb(68, 68, 68)
  }

  .content-right {
    flex: 0 0 105px;
    width: 105px;
  }

  .content-right {
    color: white;
    line-height: 46px;
    background: rgb(83, 83, 85);
    font-size: 13px;
  }

  .min-hasFood {
    background: rgb(64, 196, 120);
  }

  .ball-container {}

  .ball {
    position fixed;
    left 32px;
    bottom 22px;
    z-index 200;
    transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  }

  .inner-hook {
    width 16px;
    height 16px;
    border-radius 50%;
    background-color rgb(0, 160, 220);
    transition all 0.4s linear;
  }

  .good-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 70;
    background-color: white;
    transform: translate3d(0, -100%, 0);
  }

  .list-enter,
  .list-leave-to {

    transform: translate3d(0, 0px, 0);
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-to,
  .list-leave {}

  .list-content {
    width: 100%;
    max-height: 200px;
    overflow: hidden;
  }

  .list-header {
    position: relative;
    text-align: left;
    font-size: 14px;

    color: rgb(7, 17, 27);
    background-color: #f3f5f7;
    line-height: 40px;
  }


  .list-header .list-name {
    margin-left: 18px;
    text-align: left;

  }

  .clear {
    font-size: 12px;
    color: rgb(0, 160, 220);
    margin-right: 18px;
    position: absolute;
    right: 0px;
    text-align: right;
  }

  .list-ul {
    padding: 0 18px;
    font-size: 14px;
    color: rgb(7, 17, 27);
    margin:0;
  }

  

  .list-li {
    text-align: left;
    position: relative;
    padding: 12px 0 ;
    line-height: 24px;
  }


  .selectgood-control {
    position: absolute;
    top: 12px;
    right: 0;
  }

  .selectgood-price {
    font-weight: 500;
    text-align: right;
    position: absolute;
    color: rgb(240, 20, 20);
    right: 84px;
    top: 12px;
  }

.list-shadow{
  position :fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index :50;
  background :rgba(0,0,0,0.5);

}

.shadow-enter , .shadow-leave-to{
  background :rgba(0,0,0,0);
}

.shadow-enter-active ,.shadow-leave-active{
  transition :all 0.5s;
}


</style>
