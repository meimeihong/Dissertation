import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home.vue'
import reg from '../components/reg.vue'
import login from '../components/login.vue'
import password from '../components/password.vue'
import classify from '../components/classify.vue'
import cart from '../components/cart.vue'
import my from '../components/my.vue'
import classifycontent from '../components/classifycontent.vue'
Vue.use(Router)

export default new Router({
  routes: [
  	    {
        path: '/home',
        name:'home',
        component:home
      },
    {
      path:"/reg",
      name:"reg",
      component:reg
    },
    {
      path:"/login",
      name:"login",
      component:login
    },
    {
      path:"/password",
      name:"password",
      component:password
    },
    {
      path:"/classify",
      name:"classify",
      component:classify
    },
    {
      path:"/cart",
      name:"cart",
      component:cart
    },
    {
      path:"/my",
      name:"my",
      component:my
    },
    {
      path:"/classifycontent",
      name:"classifycontent",
      component:classifycontent
    }

  ]
})
