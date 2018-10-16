<template>
	<div class="stars" :class="starType">
		
		<span v-for="star in stars" class="star-item" :class="star"></span>
		
		
	</div>
	
</template>

<script>
const LENGTH = 5;
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";

export default {
  props: {
    score: {
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
     
    };
  },
  computed: {
    starType() {
      return "star-" + this.size;
    },
    stars() {
      let result = [];
      let starScore = Math.floor(this.score * 2) / 2;
      let hasDecimal = starScore % 1 !== 0;
      let integer = Math.floor(starScore);
      let i = 0;
      for (i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
        i++;
      }
      for (let j = LENGTH; j > i; j--) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';



.stars {
	font-size: 0;
	margin-top :16px;
	margin-bottom :28px;
}

.star-48 .star-item{
	width: 20px;
	height: 20px;
	margin-right: 22px;
	background-size: 20px 20px;
}

.star-48 .on {
	bg-image('star48_on');
}

.star-48 .half {
	bg-image('star48_half');
}

.star-48 .off {
	bg-image('star48_off');
}

.star-36 .star-item{
	width: 15px;
	height: 15px;
	margin-right: 6px;
	background-size: 15px 15px;
}

.star-36 .on {
	bg-image('star36_on');
}

.star-36 .half {
	bg-image('star36_half');
}

.star-36 .off {
	bg-image('star36_off');
  
}

.star-24 .star-item{
	width: 10px;
	height: 10px;
	margin-right: 3px;
	background-size: 10px 10px;
}

.star-24 .on {
	bg-image('star24_on');
}

.star-24 .half {
	bg-image('star24_half');
}

.star-24 .off {
	bg-image('star24_off');
}

.star-item {
	display: inline-block;
	background-repeat: no-repeat;
}

.star-item:last-child {
	margin-right: 0px;
}
</style>
