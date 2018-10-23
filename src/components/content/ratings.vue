<template>
  <div class="ratings" ref="sellerRatings">
    <div class="ratings-wrapper">
      <div class="rating-total">
        <div class="total-left">
          <p class="total-score">{{seller.score}}</p>
          <p class="total-description">综合评分</p>
          <p class="total-compare">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="total-right">
          <div>
            <span class="score-type">服务态度</span>
            <star :score="seller.serviceScore" :size="24"></star>
            <span class="score-num">{{seller.serviceScore}}</span>
          </div>
          <div>
            <span class="score-type">服务态度</span>
            <star :score="seller.serviceScore" :size="24"></star>
            <span class="score-num">{{seller.serviceScore}}</span>
          </div>
          <div>
            <span class="score-type"> 送达时间</span>
            <span class="deliver-num">{{seller.deliveryTime}}分钟</span>
          </div>

        </div>
      </div>
      <div class="user-ratings">
        <rating-compoment :desc="desc" :selctType="selctType"
         :onlyContent="onlyContent" ref="myreatingCompoment"
         :showRatingType=2
         :ratings="ratings">
           
        </rating-compoment>
       
      </div>
    </div>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  import star from '../star/star.vue'
  import ratingCompoment from "../ratings/ratingCompoment.vue";
  import data from '../../../data.json'
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 3;
  const ERR_OK = 0;
  export default {
    components: {
      star,
      ratingCompoment,
    },
    data() {
      return {
        desc: {
          all: '全部',
          positive: "推荐",
          negative: "吐槽",
        },
        onlyContent: true,
        selctType: ALL,
        ratings: [],
      }
    },
    props: {
      seller: {
        type: Object,
        required: true,
      }
    },
    created() {
      let response = data.ratings;
        this.ratings = response;
          console.log(this.ratings);
      /*this.$http.get('/api/ratings').then(response => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          console.log(this.ratings);
         

        }

      }, response => {

      });*/
    },
    mounted(){
       this.$nextTick(() => {
            if (!this.scroll) {
              let sellerRating = this.$refs.sellerRatings;
              
              this.scroll = new BScroll(sellerRating, {
                click: true,
              })
            }
          });
    }

  }

</script>

<style lang="stylus" scoped>
ul{
  list-style-type :none;
  padding:0;
}
  .ratings {
    position: absolute;
    top: 275px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    background: #f3f5f7;

  }

  .ratings-wrapper {}

  .rating-total {
    display: flex;
    background: white;
  }

  .total-left {
    flex: 4;
    margin: 18px 0;
    padding: 0 18px;
    text-align: center;
    border-right: 1px solid rgba(230, 231, 230, 1);

  }

  .total-right {
    flex: 6;
    text-align: left;
    margin: 18px 30px;
  }

  @media screen and (max-width: 320px) {
    .total-right {
      margin: 18px 12px;
    }

    .total-left {
      padding: 0px;
      flex: 130px 0 0;
    }
  }

  .total-score {
    font-size: 24px;
    color: rgb(255, 153, 0);
    line-height: 28px;
    margin-bottom: 6px;
  }

  .total-description {
    font-size: 12px;
    color: rgb(7, 17, 27);
    line-height: 12px;
    margin-bottom: 8px;
  }

  .total-compare {
    font-size: 12px;
    color: gray;
    line-height: 12px;
    margin-bottom: 3px;
  }

  .score-type {
    font-size: 12px;
    line-height: 18px;
    color: rgb(7, 17, 27);
  }

  .stars {
    margin: 8px 12px;
    display: inline-block;
  }

  .score-num {
    font-size: 12px;
    color: rgb(255, 153, 0);
  }

  .deliver-num {
    font-size: 12px;
    color: gray;
    margin-left: 12px;
    line-height: 18px;

  }

  .user-ratings {
    text-align: left;
    padding: 12px 18px;
    margin-top: 16px;
    background: white;
  }

  .ratings-type {
    padding: 18px 0;
  }

</style>
