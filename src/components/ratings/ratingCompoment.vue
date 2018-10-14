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
      <span class="icon-check_circle" :class="{'seeAll':onlyContent}"></span>
      <span>只查看有内容的评价</span>
    </div>
    <div class="line-bottom"></div>
    <div class="all-ratings">
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
  </div>
</template>


<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  import {
    formatDate
  } from "../../common/js/date.js"
  export default {


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
        return formatDate(rightTime, "YYYYY-MM-DD HH:mm");
      },
      showRatingType(value){
          if(value === 0){
              return "赞了该商品";
          }
            else if (value === 1)
            {
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
    margin: 12px 0 6px 0;
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
    margin: 6px 0;
  }

  .choose-hascontent span {
    font-size: 12px;

  }

  .icon-check_circle:before {
    content: "\e902";
  }

  .icon-check_circle {
    color: #939597;
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

</style>
