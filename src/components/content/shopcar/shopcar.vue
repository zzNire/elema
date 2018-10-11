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

      <div class="content-right" :class="{'min-hasFood':totalPrice>=minPrice}">
        <span >{{payDesc}}</span>
        <div class="delivery">

        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition v-for="(ball,index) in balls" 
        :key="index" name="drop-ball"
      
        @before-enter="beforeDrop"
        @enter="dropping"
        @after-enter="afterDrop"
        >
            <div class="ball"   v-show="ball.show" :css="false">
                <div class="inner-hook" :class="index"></div>
            </div>
        </transition>
    </div>
   
  </div>
</template>


<script>

  import ball from "./ball.vue";

  export default {
    components:{
        ball,
    },
    data(){
      return {
         balls:[
                {
                    show:false,
                },
                 {
                    show:false,
                },
                 {
                    show:false,
                },
                 {
                    show:false,
                },
                 {
                    show:false,
                },

            ],
          dropBall:[],
      }
    },
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
        for(let i=0 ;i<this.selectFoods.length ; i++)
        {
          price += this.selectFoods[i].price * this.selectFoods[i].count;
        }
        return price;
        
      },
      totalCount(){
        let count = 0;
        for(let i=0;i<this.selectFoods.length ;i++)
        {
          count += this.selectFoods[i].count;
        }
        return count;
        
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
          return "￥0";
        }
      }
    },
    methods:{
      ballDrop(el){
         for(let i=0; i<this.balls.length; i++) {
                        let ball = this.balls[i]
                        if(!ball.show) {
                            ball.show = true
                            ball.el = el
                            this.dropBall.push(ball)
                            return
                        }
                    }
        
      },
        beforeDrop(el){
        let count = this.balls.length
                    while(count--) {
                        let ball = this.balls[count]
                        if(ball.show) {
                            // 获得点击处相对于浏览器的位置
                            let rect = ball.el.getBoundingClientRect()
                            // 小球要移动的横坐标
                            let x = rect.left - 32
                            // 小球要移动的纵坐标
                            let y = -(window.innerHeight - rect.top - 22)
                            el.style.webkitTransform = 'translate3d(0,' + y +'px,0)'
                            el.style.transform = 'translate3d(0,'+ y +'px,0)'
                            let inner = el.getElementsByClassName('inner-hook')[0]
                            inner.style.webkitTransform = 'translate3d('+ x +'px,0,0)'
                            inner.style.transform = 'translate3d('+ x +'px,0,0)' 
                        } 
                    }
        },
        dropping(el){
        
          let rf = el.offsetHeight
                    this.$nextTick(()=>{
                        el.style.webkitTransform = 'translate3d(0,0,0)'
                        el.style.transform = 'translate3d(0,0,0)'
                        let inner = el.getElementsByClassName('inner-hook')[0]
                        inner.style.webkitTransform = 'translate3d(0,0,0)'
                        inner.style.transform = 'translate3d(0,0,0)'
                    });

           
             
            
        },
        afterDrop(el){
           let ball = this.dropBall.shift()
                    if(ball){
                        ball.show = false
                        el.style.display = 'none'
                    }
           
            
        },
       
      
    },

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

.ball-container{

  } 

  .ball{
    position fixed;
    left 32px;
    bottom 22px;
    z-index 200;
    transition all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
  }

  .inner-hook{
    width 16px;
      height 16px;
      border-radius 50%;
      background-color rgb(0,160,220);
      transition all 0.4s linear;
  }
</style>
