<template>
  <div class="button-warp">
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
    
    function handlePoint(e) {
      isClick.value = true
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
      handlePoint
    }
  },
  
})
</script>

<style scoped lang="less">
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

