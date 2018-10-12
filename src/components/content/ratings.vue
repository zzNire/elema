<template>
  <div class="ratings">
    <div class="text">test</div>
    <div v-blur="blurConfig" class="content">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        blurConfig: {
          isBlurred: true,

        },
      }
    }
  }

</script>

<style scoped>
.ratings{
    position: relative;
}
    .content{
        position: absolute;
        top:0px;
        width: 100%;
        height: 30px;
        background: rgba(0, 0, 0, 0.5)
    }
</style>
