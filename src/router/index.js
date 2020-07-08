import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let router = new Router({
  linkActiveClass: "active",
  mode: "history",
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      component: () => import("@/Views/Home/Home.vue"),
      redirect:'/home/examination',
      children: [
        {
        path: '/home/examination',
        component: () => import("@/Views/ContentJump/Examination.vue")
      },
      {
        path: '/home/management',
        component: () => import("@/Views/ContentJump/Management.vue")
      },
      {
        path: '/home/papers_tedious',
        component: () => import("@/Views/ContentJump/Papers_tedious.vue")
      },
      {
        path:'/home/process',
        component: () => import("@/Views/ContentJump/Process.vue")
      },
      {
        path:'/home/addlistexam',
        component: () => import("@/components/Add_List_Exam")
      },
      {
        path:'/home/detail',
        component: () => import("@/components/Detail")
      },
      {
        path:'/home/bdatabase',
        component: () => import("@/Views/ContentJump/Bdatabase")
      }
    ]
    },
    {
      path: '/login',
      name:'login',
      component: () => import("@/Views/Login/Login.vue")
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.path == "/login") {
//     next();
//   } else {
//     const token = sessionStorage.getItem("user");
//     if (token) {
//       next();
//     } else {
//       router.push({
//         name: "login"
//       });
//     }
//   }
// });

export default router;