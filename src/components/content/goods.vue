<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul class="menu-ul">
        <li class="menu-li" v-for="good in goods">
          <span-icon class="icon-li" v-if="good.type != -1" :iconType="good.type" :iconSize="12"></span-icon>
          <span class="text-li">{{good.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul class="goods-ul">
        <li class="goods-li" v-for="goodType in goods">
          <p class="type-name">{{goodType.name}}</p>
          <ul class="food-in-type">
            <li class="food-in-type-li" v-for="food in goodType.foods">
              <div class="food-img">
                <img :src="food.icon">
              </div>
              <div class="food-info">
                <h2 class="food-name">{{food.name}}</h2>
                <p class="food-description">{{food.description}}</p>
                <div class="food-detail">
                  <span class="food-sellCount">月售{{food.sellCount}}</span>
                  <span class="food-rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="food-price">￥{{food.price}}</span>
                  <span class="food-oldprice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>

              </div>
            </li>
          </ul>

        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  const ERR_OK = 0;
  import spanIcon from "../spanIcon/spanIcon.vue";
  export default {
    components: {
      spanIcon
    },
    props: {
      seller: {
        type: Object
        // required: true
      }
    },
    data() {
      return {
        goods: []
      };
    },
    created() {
      this.$http.get("/api/goods").then(
        response => {
          response = response.body;
          if (response.errno === ERR_OK) {
            this.goods = response.data;
            console.log(this.goods);
          }
        },
        response => {}
      );
    },
    mounted() { //在元素挂在完之后进行Scroll的初始化 才能获得dom
      this.initScroll();
    },
    methods: {
      initScroll() {
        let wrapper = document.querySelector('.menu-wrapper');
        this.scroll = new BScroll(wrapper, {});

        let wrapperFood = document.querySelector('.foods-wrapper');
        this.scrollFood = new BScroll(wrapperFood, {});
      }
    }
  };

</script>

<style scoped>
  li {
    list-style-type: none;
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
    text-align: left;
    display: table;
    list-style-type: none;
    font-size: 12px;
    height: 54px;
    padding: 12px 12px 12px 12px;
    font-size: 12px;
    color: rgb(7, 17, 27);
  }

  .icon-li {
    vertical-align: middle;
    margin-right: 3px;
  }

  .text-li {
    text-align: left;
    vertical-align: middle;
    line-height: 14px;
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
    width: 85%;
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
    margin-left: 10px;
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

</style>
