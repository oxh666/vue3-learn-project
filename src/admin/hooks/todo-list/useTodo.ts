import {ref,computed,watchEffect} from 'vue'

export default function useTodos() {
  let title = ref("");
  let todos = ref([{ title: "学习Vue", done: false }]);
 
  watchEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos.value))
  })
  /**
   *@description 添加todo
   */
  function addTodo() {
    todos.value.push({
      title: title.value,
      done: false,
    });
    title.value = "";
  }
  /**
   *@description 清除已完成的todo
   */
  function clear() {
    todos.value = todos.value.filter((v) => !v.done);
  }
  
  // 计算属性
  /**
   * @description 未完成的todo数量
   */
  let active = computed(() => {
    return todos.value.filter((v) => !v.done).length;
  });
  
  /**
   * @description 所有的todo数量
   */
  let all = computed(() => todos.value.length);
  
  /**
   * @description 是否全部完成
   */
  let allDone = computed({
    get: function () {
      return active.value === 0;
    },
    set: function (value) {
      todos.value.forEach((todo) => {
        todo.done = value;
      });
    },
  });
  return { title, todos, addTodo, clear, active, all, allDone };
}
