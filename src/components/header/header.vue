<template>
    <div class="header">
        <div class="content">
            <div class="icon"> 
                <img :src="seller.avatar" height="64" width="64">
            </div>
            <div class='message'>
                <div class="title">
                     <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
               <div class="detals">
                   {{seller.description}}/{{seller.deliveryTime}}分钟送达
               </div>
            </div>
        </div>
        <div class="comment"></div>
    </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
</style>
