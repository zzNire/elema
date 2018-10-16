<template>
  <div class="seller" ref="sellerScroll">
    <div class="seller-content">
      <div class="overview">
        <div class="overview-top">
          <div class='seller-info'>
            <p class="seller-name">{{seller.name}}</p>
            <div class="seller-rating">
              <star :score="seller.score" :size="36"></star>
              <span class="rating-count">({{seller.ratingCount}})</span>
              <span class="sell-count">月售{{seller.sellCount}}单 </span>
            </div>
          </div>

          <div class="seller-love" @click="changeFaverate">
            <i class='icon-favorite' :class=" isFaverate ? 'like' : 'unlike' "></i>
            <p class="love-content">{{Faverate}}</p>
          </div>
        </div>
        <div class="overview-bottom">
          <div class="left">
            <p class="title">起送价</p>
            <p class="num">{{seller.minPrice}}<span class="decoration">元</span></p>
          </div>
          <div class="middle">
            <p class="title">商家配送</p>
            <p class="num">{{seller.deliveryPrice}}<span class="decoration">元</span></p>
          </div>
          <div class="right">
            <p class="title">评价配送时间</p>
            <p class="num">{{seller.deliveryTime}}<span class="decoration">分钟</span></p>
          </div>
        </div>
      </div>
      <div class="seller-report">
        <p class="p-title">公告与活动</p>
        <P class="seller-introduce">{{seller.bulletin}}</P>
        <div class="seller-supports">
          <ul v-if="seller.supports" class="seller-supports">
            <li v-for="support in seller.supports" class="support-item">
              <span :class="saleType[support.type]" class="li-icon"></span>
              <span class="li-text">{{support.description}}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="seller-sightseeing">
        <p class="p-title">商家实景</p>
        <div class="picture-list" ref="pictureScroll">
          <ul class="pictures-ul" ref="picturesUl">
            <li class="pictures-li" v-for="picture in seller.pics">
              <img class="picture" :src="picture">
            </li>
          </ul>
        </div>
      </div>

      <div class="seller-detail">
        <p class="p-title">商家信息</p>
        <div class='p-infos'>
          <p class="p-info" v-for="info in seller.infos">{{info}}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import star from "../star/star.vue";
  import BScroll from 'better-scroll';
  import {
    saveTolocal,
    loadFromLocal
  } from '../../common/js/store.js';
  export default {
    props: {
      seller: {
        type: Object,
        required: true,
        default: {},
      },
    },
    components: {
      star,
    },
    data() {
      return {
        saleType: ["decrease", "discount", "special", "invoice", "guarantee"],
        isFaverate: (() => {
          return loadFromLocal(this.seller.id, 'isFaverate', false);
        })(),
      }
    },
    mounted() {
      this.$nextTick(() => {
        let pictureWidth = 120;
        let margin = 6;
        console.log("this.seller");
        console.log(this.seller);
        if(this.seller.pics)
        {
        let width = (pictureWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picturesUl.style.width = width + "px";
        if (!this.picturescroll) {
          let picturelist = this.$refs.pictureScroll;
          this.picturescroll = new BScroll(picturelist, {
            scrollX: true,
            eventPassthrough: 'vertical',
          })
        } else {
          this.picturescroll.refresh();
        }
        }
      });


      this.$nextTick(() => {
        if (!this.scroll) {
          let list = this.$refs.sellerScroll;
          this.scroll = new BScroll(list, {
            click: true,
          });
        } else {
          this.scroll.refresh();
        }




      });
    },
    computed: {
      Faverate() {
        if (this.isFaverate) {
          return "已收藏";
        } else {
          return "收藏";
        }
      }
    },
    methods: {
      changeFaverate() {
        this.isFaverate = !this.isFaverate;
        saveTolocal(this.seller.id, 'isFaverate', this.isFaverate);
        console.log(window.localStorage);
      }
    }
  }

</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/mixin.styl';

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .seller {
    width: 100%;
    position: absolute;
    top: 275px;
    bottom: 0;
    text-align: left;
    background: #f3f5f7;
    overflow: hidden;
  }


  .overview {
    width: 100%;
    padding: 18px;
    border-bottom: solid 1px rgba(7, 17, 27, 0.1);
    background: white;

  }

  .overview-top {
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px rgba(7, 17, 27, 0.1);
    padding-bottom: 18px;
    width: 100%
  }

  .seller-info： {
    flex: 1;
  }

  .seller-name {
    font-size: 14px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    margin-bottom: 8px;
  }

  .seller-rating {}

  .stars {
    margin: 0px;
    display: inline-block;
    vertical-align: middle;
  }

  .rating-count {
    font-size: 12px;
    color: rgb(77, 85, 93);
    margin-left: 8px;
    margin-right: 12px;
  }

  .sell-count {
    font-size: 12px;
    color: rgb(77, 85, 93);
  }

  .icon-favorite:before {
    content: "\e904";

  }

  .icon-favorite {
    font-size: 24px;
    padding: 4px;
  }

  .love-content {
    font-size: 12px;
    line-height: 12px;
    color: rgb(77, 85, 93);
  }

  .seller-love {
    width: 50px;

    height: 40px;

    text-align: center;

  }

  .like {
    color: rgb(240, 20, 20);
  }

  .unlike {
    color: rgb(77, 85, 93);
  }

  .overview-bottom {
    margin-top: 18px;
    display: flex;
    text-align: center;
  }

  .left {
    flex: 1;
  }

  .middle {
    flex: 1;
  }

  .right {
    flex: 1;

  }

  .title {
    font-size: 12px;
    color: rgb(147, 153, 159);
    line-height: 12px;
  }

  .num {
    margin-top: 4px;
    font-size: 24px;
    color: rgb(7, 17, 27);


  }

  .decoration {
    font-size: 12px;

  }

  .seller-report {
    margin-top: 18px;
    background: white;
    padding: 18PX;
  }

  .p-title {
    font-size: 14px;
  }

  .seller-introduce {
    margin-top: 8px;
    font-size: 12px;
    line-height: 24px;
    text-align: justify;
    padding-bottom: 16px;
    border-bottom: solid 1px rgba(7, 17, 27, 0.1);
    font-weight: 200;
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

  .seller-supports {
    padding: 0;
    margin: 0;
  }

  .support-item {
    list-style-type: none;
    text-align: left;
    padding: 12px 0;
    margin-left: 6px;
    border-bottom: solid 1px rgba(7, 17, 27, 0.1);
  }

  .seller-supports :last-child {
    border-bottom: 0px;
  }

  .support-item .li-icon {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-size: 15px 15px;
    background-repeat: no-repeat;
    vertical-align: middle;
    margin-right: 6px;
  }

  .support-item .li-text {
    font-size: 12px;
    line-height: 12px;
    font-weight: 200;
  }

  .seller-sightseeing {
    margin-top: 16px;
    padding: 18px;
    background: white;

  }

  .seller-sightseeing p {
    font-size: 14px;
  }

  .picture-list {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 12px;
  }

  .pictures-ul {
    font-size: 0;
  }

  .pictures-li {
    display: inline-block;
    margin-right: 6px;
    width: 120px;
    height: 90px
  }

  .picture {
    height: 90px;
    width: 120px;
    object-fit: cover;

  }

  .seller-detail {
    margin-top: 16px;
    padding: 18px;
    background: white;

  }

  .seller-detail .p-title {
    border-bottom: solid 1px rgba(7, 17, 27, 0.1);
    padding-bottom: 12px;
  }

  .p-info {
    font-size: 12px;
    padding: 16px 0;
    border-bottom: solid 1px rgba(7, 17, 27, 0.1);
    font-weight: 200;
  }

  .p-infos :last-child {
    border: 0px;
  }

</style>
