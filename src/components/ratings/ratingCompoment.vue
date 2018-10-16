<template>
  <div class="ratings-content">
    <div class="ratings-type">
      <span class="type-all" @click="changeType(2)" :class="{'type_selected':rightSelectedType===2}">{{desc.all}}
        {{ratings.length}}</span>
      <span class="type-positive" @click="changeType(0)" :class="{'type_selected':rightSelectedType===0}">{{desc.positive}}
        {{positiveCount}}</span>
      <span class="type-negative" @click="changeType(1)" :class="{'type_selected':rightSelectedType===1}">{{desc.negative}}
        {{negativeCount}}</span>
    </div>
    <div class="line-top"></div>
    <div class="choose-hascontent" @click="seeonlyContent">
      <i class="icon-check_circle" :class="{'seeAll':onlyContent}"></i>
      <span>只查看有内容的评价</span>
    </div>
    <div class="line-bottom"></div>
    <div class="all-ratings" v-if="showRatingType === 1">
      <ul class="ratings-ul">
        <li class="ratings-li" v-for="rating in selectRatings">
          <div class="li-contetn">
            <div>
              <img class="uese-icon" :src="rating.avatar">
            </div>
            <div class="user-content">
              <div class="user-info">
                <p class="user-name">{{rating.username}}</p>
                <p class="user-state">{{rating.rateType | showRatingType}}</p>
                <span class="deliver-time">{{rating.rateTime | showTime}}</span>
              </div>
              <p class="user-rating">{{rating.text}}</p>
            </div>
          </div>
          <div class="line-bottom"></div>
        </li>
      </ul>
    </div>
    <div class="R-ratings-wrapper" v-else>
      <ul class="R-ratings-ul">
        <li class="R-ratings-li" v-for="rating in selectRatings">
          <div class="R-ratings-flex">
            <div class="R-ratings-left">
              <img class="R-user-icon" :src="rating.avatar">
            </div>
            <div class="R-ratings-right">
              <div class="R-user-info">
                <p class="R-user-name">{{rating.username}}</p>
                <star :score="rating.score" :size="24"></star>
                <span class="R-deliver-time" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                <span class="R-recommend-time">{{rating.rateTime | showTime}}</span>
              </div>
              <p class="R-rating-text">{{rating.text}}</p>
              <i class="R-rating-type" :class="rating.rateType === 0 ? 'icon-thumb_up':'icon-thumb_down'"></i>
              <span class="R-rating-recommend" v-for="recommend in rating.recommend">
                {{recommend}}
              </span>
            </div>
          </div>
          <div class="line-bottom"></div>
        </li>
      </ul>
    </div>

  </div>
</template>


<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  import {
    formatDate
  } from "../../common/js/date.js"
  import star from "../star/star.vue"
  export default {

    components: {
      star,
    },
    props: {
      ratings: {
        type: Array,

        default () {
          let ratings = [];
          return ratings;
        },
      },
      selctType: {
        type: Number,

      },

      desc: {
        type: Object,

        default () {
          return {
            all: '全部',
            positive: "好评",
            negative: "差评",
          }
        }
      },
      showRatingType: {
        type: Number,
        default: 1,

      }
    },
    data() {
      return {
        rateType: ["全部", "好评", "差评"],
        rightSelectedType: ALL,
        onlyContent: true,
      };
    },
    computed: {
      positiveCount() {
        let positiveCount = 0;
        let negativeCount = 0;
        for (let i = 0; i < this.ratings.length; i++) {
          if (this.ratings[i].rateType === POSITIVE) {
            positiveCount++;
          } else if (this.ratings[i].rateType === NEGATIVE) {
            negativeCount++;
          }
        }
        this.negativeCount = negativeCount;
        return positiveCount;
      },
      ratingTime() {
        // let time = new Date(this.)
      },
      selectRatings() {
        let inputRatings = [];
        let result = [];
        if (this.onlyContent === false) {
          console.log("see all");
          inputRatings = this.ratings;
        } else {
          console.log("see only content");
          for (let i = 0; i < this.ratings.length; i++) {
            if (this.ratings[i].text !== "") {
              inputRatings.push(this.ratings[i])
            }
          }
        }
        if (this.rightSelectedType === POSITIVE) {
          for (let i = 0; i < inputRatings.length; i++) {

            if (inputRatings[i].rateType === POSITIVE) {
              result.push(inputRatings[i])
            }
          }
        } else if (this.rightSelectedType === NEGATIVE) {
          for (let i = 0; i < inputRatings.length; i++) {

            if (inputRatings[i].rateType === NEGATIVE) {
              result.push(inputRatings[i])
            }
          }
        } else result = inputRatings;
        return result;
      },
      userState() {
        return "";
      }
    },
    methods: {
      seeonlyContent() {
        this.onlyContent = !this.onlyContent;
      },
      changeType(type) {
        console.log("selectType" + type);
        this.rightSelectedType = type;
      },

    },
    filters: {
      showTime(value) {
        let rightTime = new Date(value);
        return formatDate(rightTime, "YYYY-MM-DD HH:mm");
      },
      showRatingType(value) {
        if (value === 0) {
          return "赞了该商品";
        } else if (value === 1) {
          return "踩了该商品";
        }
      }
    }

  }

</script>

<style lang="stylus" scoped>
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }


  .line-top {
    width: 100%;
    height: 1px;
    border-bottom: dashed 1px rgba(230, 231, 230, 0.7);
  }


  .line-bottom {
    width: 100%;
    height: 1px;
    background: rgba(230, 231, 230, 0.7);
  }

  .ratings-type {
    height: 30px;
    margin: 12px 0;
  }

  .type-all,
  .type-positive {
    margin-right: 8px;
    display: inline-block;
    padding: 8px 12px;
    font-size: 12px;
    line-height: 12px;
    color: rgb(111, 119, 131);
    background: rgb(237, 245, 254);
    border-radius: 10%;
  }

  .type-negative {
    margin-right: 8px;
    display: inline-block;
    padding: 8px 12px;
    font-size: 12px;
    line-height: 12px;
    color: rgb(170, 170, 170);
    background: rgb(245, 245, 245);
    border-radius: 10%;
  }

  .type_selected {
    color: white;
    background: rgb(73, 147, 247);
  }

  .type-negative.type_selected {
    color: white;
    background: rgb(204, 204, 204);
  }

  .choose-hascontent {
    margin: 8px 0;
  }

  .choose-hascontent span {
    font-size: 12px;
    line-height: 20px;

  }

  .icon-check_circle:before {
    content: "\e902";
  }

  .icon-check_circle {
    font-size: 20px;
    color: #939597;
    vertical-align: middle;
  }

  .seeAll {
    color: rgb(118, 214, 114);
  }

  .ratings-li {
    position: relative;
    padding-top: 12px;

  }

  .uese-icon {
    position: absolute;
    width: 28px;
    height: 28px;
    top: 12px;
    left: 0px;
    border-radius :50%;
  }

  .user-content {
    padding-left: 35px;
  }

  .user-name {
    font-size: 12px;
    vertical-align: top;
    line-height: 12px;
  }

  .user-state {
    margin-top: 4px;
    font-size: 12px;
    line-height: 12px;

  }

  .user-info {
    position: relative;
  }

  .deliver-time {
    position :absolute;
    font-size: 12px;
    color: gray;
    position: absolute;
    right: 0px;
    top: 0px;
    line-height: 28px;
  }

  

  .user-rating {
    margin-top: 6px;
    font-size: 12px;
  }

  .li-contetn {
    margin-bottom: 12px;
  }

  .ratings-ul :last-child .line-bottom {
    height: 0;
  }

  .R-ratings-flex {
    display: flex;
    margin: 18px 0;
  }

  .R-ratings-left {
    flex: 40px 0 0;
  }

  .R-ratings-right {
    flex: 1;
  }

  .R-user-icon {
    width: 28px;
    height: 28px;
    margin-right: 12px;
    border-radius: 50%;
  }

.R-user-info{
  position :relative;
}
  .R-user-name {
    font-size: 12px;
    color: rgb(7, 17, 27);
    line-height: 12px;
  }

  .stars {
    margin: 4px 6px 7px 0;
    display: inline-block;
  }

  .R-deliver-time {
    display: inline-block;
    font-size: 12px;
    color: rgb(147, 153, 159);
    line-height: 12px;
  }

.R-recommend-time{
  position :absolute;
    font-size :12px;
    font-weight :200;
    color :rgb(147,153,159);
    line-height :28px;
    top:0px;
    right:0px;
  }
  .R-rating-text {
    font-size: 12px;
    color: rgb(7, 17, 27);
    line-height: 18px;

  }

  .icon-thumb_down:before {
    content: "\e908";
  }

  .icon-thumb_up:before {
    content: "\e909";
  }

  .R-rating-type {
    font-size: 12px;
    color: rgb(73, 147, 247);
    margin-right: 4px;
  }

  .R-rating-recommend {

    font-size: 12px;
    color: rgb(147, 153, 159);
    width: 100px;
    border: 1px solid rgba(7, 17, 27, 0.1) ;
    border-radius:2px;
    padding: 1px 6px;
    margin-right: 8px;
    line-height: 24px;

  }

  .R-ratings-ul :last-child .line-bottom {
    height: 0;
  }

</style>
