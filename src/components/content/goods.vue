<template>
<div class="goods-menu">
  <div class="goods">
    <div class="menu-wrapper">
      <ul class="menu-ul" >
        <li class="menu-li" 
        :class="currentIndex === index ? 'currentItem' :'' " 
        v-for="(good,index) in goods "
        @click="selectMenu(index)" >
        
          
          <span class="text-li">
            <span-icon class="icon-li" v-if="good.type != -1" :iconType="good.type" :iconSize="12"></span-icon>{{good.name}}</span>
       
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul class="goods-ul">
        <li class="goods-li goods-li-hook" v-for="goodType in goods">
          <p class="type-name">{{goodType.name}}</p>
          <ul class="food-in-type">
            <li class="food-in-type-li" v-for="food in goodType.foods">
              <div class="food-img">
                <img :src="food.icon">
              </div>
              <div class="food-info">
                <h2 class="food-name">{{food.name}}</h2>
                <p class="food-description" v-if="food.description">{{food.description}}</p>
                <div class="food-detail">
                  <span class="food-sellCount">月售{{food.sellCount}}</span>
                  <span class="food-rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="food-price">￥{{food.price}}</span>
                  <span class="food-oldprice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="shop-contral">
                  <shopcar-contral :food="food"
                    @selectFood="selectFood"></shopcar-contral>
                </div>

              </div>
            </li>
          </ul>

        </li>
      </ul>

    </div>

  </div>
  <shopcar class="shop-car"
    :deliveryPrice="seller.deliveryPrice"
    :minPrice="seller.minPrice"
    :selectFoods="selectFoods"
    ref="shopcar"> </shopcar>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopcar from './shopcar/shopcar.vue'
  const ERR_OK = 0;
  import spanIcon from "../spanIcon/spanIcon.vue";
  import shopcarContral from "../shopcarContral/shopcarContral.vue"
  
  export default {
    components: {
      spanIcon,
      shopcar,
      shopcarContral
    },
    props: {
      seller: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        goods: [],
        listHeight:[],
        scrollY,
      };
    },
    created() {
      this.$http.get("/api/goods").then(
        response => {
          response = response.body;
          if (response.errno === ERR_OK) {
            this.goods = response.data;
            console.log(this.goods);
            this.$nextTick(()=>{   //等到整个视图都渲染完毕
                this.initScroll();
                this.calculateHight();
            })
          }
           
        },
        response => {}
      );
    },
    methods: {
      initScroll() {
        let wrapper = document.querySelector('.menu-wrapper');
        this.scroll = new BScroll(wrapper, {
          click:true,
        });

        let wrapperFood = document.querySelector('.foods-wrapper');
        this.scrollFood = new BScroll(wrapperFood, {
          click:true,
          probeType:3,
         
        });
       this.scrollFood.on('scroll',(pos)=>{
         this.scrollY = Math.abs (Math.round(pos.y));
       });
      },
      calculateHight(){
        let height = 0;
        this.listHeight.push(height);
        let foodLi = this.$refs.foodsWrapper.getElementsByClassName("goods-li-hook");
       //console.log("foodli");
       //console.log(foodLi);
       //console.log(foodLi.length);
        for(let i = 0; i < foodLi.length ; i++)
        {
          //console.log("height"+height);
            height+=foodLi[i].clientHeight;
            this.listHeight.push(height);
        }
      },
      selectMenu(index){
        console.log(index);
        this.scrollY = this.listHeight[index];
        let foodList = this.$refs.foodsWrapper.getElementsByClassName("goods-li-hook");
        let el = foodList[index]
        this.scrollFood.scrollToElement(el,300);
      },
      _drop(target){
        this.$refs.shopcar.ballDrop(target);//调用子组件方法 传入dom
      },
      selectFood(target){
        this._drop(target);
      }
    },
    computed:{
      currentIndex(){
        for (let i=0;i<this.listHeight.length;i++)
        {
          if(!this.listHeight[i+1] ||
          (this.scrollY >= this.listHeight[i] && this.scrollY < this.listHeight[i+1]))
          {
            return i;
          }
        }
        return 0;
      },
      selectFoods(){
        let selectfood = [];
        this.goods.forEach((good)=>{
            good.foods.forEach((food)=>{
              if(food.count>0)
              {
                selectfood.push(food);
              }
            })
        });
        return selectfood;
      }
     
      
    },

  };

</script>

<style scoped>
  li {
    list-style-type: none;
  }

.goods-menu{
  height: 100%;
  width: 100%;
}
  .goods {
    display: flex;
    position: absolute;
    width: 100%;
    top: 275px;
    bottom: 46px;
    overflow: hidden;
    z-index: -1;
  }

  .goods-ul {
    margin: 0px;
    padding: 0px;
    text-align: left;
  }

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }

.currentItem{
  background: white;
  font-weight: bold;
}
  .foods-wrapper {
    flex: 1;
    margin: 0px;
    padding: 0px;
  }

  .menu-ul {
    padding: 0px;
    margin: 0px;
  }

  .menu-li {
    display: table;
    list-style-type: none;
    font-size: 12px;
    line-height: 14px;
    height: 52px;
    width:100%;
    padding: 12px 12px 12px 12px;
    color: rgb(7, 17, 27);
    
  }

  .icon-li {
   
    margin-right: 3px;
  }


  .text-li {
    display: table-cell;
    width: 80px;
    vertical-align: middle;
    line-height: 14px;
    text-align: left;
  }

  .type-name {
    font-size: 12px;
    line-height: 26px;
    color: rgb(147, 153, 159);
    background: #f3f5f7;
    border-left: solid 3px #d9dde1;
    padding-left: 14px;
    height: 26px;
  }

  .food-in-type {
    padding: 0px;
  }

  .food-in-type-li {
    width: 90%;
    display: flex;
    margin: 18px 0 18px 18px;
  }

  .food-img {
    flex: 0 0 114px;
  }

  .food-img img{
	width: 100px;
	height: 100px;
  }

  .food-info {
    flex: 1;
    font-size: 10px;
    color: rgb(147, 153, 159);
    position: relative;
  }

  .food-name {
    font-size: 14px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    margin-top: 2px;
    margin-bottom: 8px;
  }

  .food-description {
    font-size: 10px;
    margin-bottom: 8px;
    overflow: hidden;
    line-height: 15px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .food-detail {
    margin-bottom: 8px;
   
  }

  .food-sellCount {
    margin-right: 12px;
  }

  .price {
    position: absolute;
    bottom: 0px;
    left: 0;
  }

  .food-price {
    color: rgb(253, 96, 69);
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
  }

  .food-oldprice {
    font-size: 10px;
    line-height: 24px;
    color: rgb(147, 153, 159);
    font-weight: 700;
    text-decoration: line-through;
    margin-left: 8px;
  }

  .shop-contral{
    position: absolute;
    height:24px;
    right: 0;
    bottom: 0;
  }
.shop-car{

}
</style>
