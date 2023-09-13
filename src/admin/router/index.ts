import {
    createRouter,
    createWebHashHistory,
  } from 'vue-router'
  import About from '../components/About.vue'
  import Home from '../components/Home.vue'
import Button from "../components/Button.vue";
  
  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path:'/btn',
      name: 'Btn',
      component: Button
    }
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router
