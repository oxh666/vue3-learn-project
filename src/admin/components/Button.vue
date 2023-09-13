<template>
  <div class="button-warp">
    <div class="fingerprint" v-for="finger in fingerPrints"
    :style="{
    left:finger.x+'px',
    top:finger.y+'px',
    }"
    ></div>
    <div class="button"
         :class="{pressed:isClick}"
         @pointerdown="handlePoint"
         @pointerup="$event=>isClick=false">
      <video class="button-reflection" ref="container"></video>
    </div>
    <div class="text">{{ msg }}</div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";

export default defineComponent({
  setup(props, {emit}) {
    const msg = ref<string>('同尘和光')
    const isClick = ref<boolean>(false)
    const container = ref(null)
    const fingerPrints=ref<any>([])
    function handlePoint(e) {
      isClick.value = true
      const id =Math.random().toString(16).slice(2)
      const btn=container.value.getBoundingClientRect()
      const finger={
        id,
        x:e.clientX-btn.left,
        y:e.clientY-btn.top
      }
      fingerPrints.value.push(finger)
      setTimeout(()=>{
        fingerPrints.value=fingerPrints.value.filter(f=>f.id!== id)
      },2000)
    }
    
    onMounted(() => {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      }).then(sream => {
        const video = container.value
        video.srcObject = sream
        video.onloadedmetadata = function (e) {
          video.play()
        }
      })
      
    })
    return {
      msg,
      isClick,
      container,
      fingerPrints,
      handlePoint
    }
  },
  
})
</script>

<style scoped lang="less">
.fingerprint{
  pointer-events: none;
  z-index: 100;
  position: absolute;
  left:0;
  top:0;
  transform: translate(-50%,-50%);
  width: 60px;
  height: 60px;
  background: rgba(225,225,225,0.4);
  border-radius:  100%;
  //mask-image: linear-gradient(50% 50% at 50% 50%, #00000 0%, rgba(0,0,0,0) 100%);
  mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
}
.button-warp {
  width: 300px;
  height: 100px;
  position: relative;
  overflow: hidden;
  border-radius: 60px;

  .button {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 60px;
    cursor: pointer;
    background: #eee;
    .button-reflection{
      width: 100%;
      height: 100px;
      object-fit: cover;
      opacity: 0.7;
      filter:blur(3px) saturate(0.4) brightness(1.1);//模糊度
      //filter:saturate(0.4)//对比度
      //filter:brightness(1.1);//亮度
    }
  }
  
  .button.pressed {
    transform: scale(0.95);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  }
  
  .text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    color: rgba(0, 0, 0, 0.7);
    font-size: 30px;
    font-weight: 500;
    text-shadow: 0 1px 1px rgba(225, 225, 225, 0.5);
  }
}
</style>

