<template>
    <div>
     <h1>   这是关于页面</h1>
      <Rate v-model="score"/>
<!--      <Rate v-model="2" :theme="'red'"/>-->
<!--      <Rate v-model="4" :theme="'green'"/>-->
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import Rate from './Rate.vue'

let score = ref<number>(3)

function update(num){
  console.log('父收',num)
  score.value = num
}
</script>

<style scoped>

</style>
