<template>
<div class="spanIcon">
    <span class="icon" :class="saleType[iconType]" :style="iconStyle" >

    </span>
</div>
</template>

<script>

export default {
    data(){
        return {
            saleType: ["decrease", "discount", "special", "invoice", "guarantee"],
            iconStyle:{
            width : this.iconSize +"px",
            height :this.iconSize +"px",
            backgroundSize: this.iconSize +"px "+ this.iconSize +"px",
         }
        };
    },
    props:{
        iconType:{
            type:Number,
            required:true,
        },
        iconSize:{
            type:Number,
            required:true,
        },
         

    },
    computed:{
        
    }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';

.spanIcon{
    display :inline-block;
    vertical-align: middle;
}
.icon {
  display: inline-block;
  background-repeat: no-repeat;
  
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

</style>
