import {ref,watchEffect} from 'vue'

export default function  useStorage(name,value:any=[]){
  let data = ref(JSON.parse(localStorage.getItem(name)|| value))
  watchEffect(()=>{ localStorage.setItem(name,JSON.stringify(data.value)) })
  return data
}
