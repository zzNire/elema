<template>
    <div class="ball-fly">
        <button @click="start" class="start">sss</button>

        <transition v-for="(ball,index) in balls" 
        :key="index" name="drop-ball"
      
        @before-enter="beforeDrop"
              @enter="dropping"
              @after-enter="afterDrop"
        >
            <div class="ball"   v-show="ball.show" :css="false">
                <div class="inner-hook" :class="index"></div>
            </div>
        </transition>
    
    </div>
</template>


<script>
export default {
    data(){
        return {
            balls:[
                {
                    show:false,
                },
                 {
                    show:false,
                },
                 {
                    show:false,
                },
                 {
                    show:false,
                },
                 {
                    show:false,
                },

            ],
            dropBalls:[],

        }
    },
    methods:{
        start(){
            for(let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i];
            if(!ball.show) {
             ball.show = true;
           
            this.dropBalls.push(ball);
            return ;
        }
      }
        },
        beforeDrop(el){
           let count = this.balls.length
                    while(count--) {
                        let ball = this.balls[count]
                        if(ball.show) {
                            // 获得点击处相对于浏览器的位置
                            let rect = ball.el.getBoundingClientRect()
                            // 小球要移动的横坐标
                            let x = rect.left - 32
                            // 小球要移动的纵坐标
                            let y = -(window.innerHeight - rect.top - 22)
                            el.style.webkitTransform = 'translate3d(0,' + y +'px,0)'
                            el.style.transform = 'translate3d(0,'+ y +'px,0)'
                            let inner = el.getElementsByClassName('inner-hook')[0]
                            inner.style.webkitTransform = 'translate3d('+ x +'px,0,0)'
                            inner.style.transform = 'translate3d('+ x +'px,0,0)' 
                        } 
                    }

        },
        dropping(el){
         let rf = el.offsetHeight
                    this.$nextTick(()=>{
                        el.style.webkitTransform = 'translate3d(0,0,0)'
                        el.style.transform = 'translate3d(0,0,0)'
                        let inner = el.getElementsByClassName('inner-hook')[0]
                        inner.style.webkitTransform = 'translate3d(0,0,0)'
                        inner.style.transform = 'translate3d(0,0,0)'
                    })

     // });
        },
        afterDrop(el){
            let ball = this.dropBall.shift()
                    if(ball){
                        ball.show = false
                        el.style.display = 'none'
                    }
        },
    },
    
}
</script>


<style lang="stylus">
.ball-fly{
    color :black;
}

.start{
    width :20px;
    height :20px;
    border-radius :50%;
    background :blue;
}

.ball{
    position fixed;
    left 32px;
    bottom 22px;
    z-index 200;
    transition all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
}

.inner-hook{
    width 16px;
      height 16px;
      border-radius 50%;
      background-color rgb(0,160,220);
      transition all 0.4s linear;
}
</style>
