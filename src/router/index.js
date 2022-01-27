import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import JobsList from '../views/JobsList.vue'
import Info from '../views/Info.vue'
import JobDetail from '../views/JobDetail.vue'
import Login from '../components/Login.vue'
import Logout from '../components/Logout.vue'
import Register from '../components/Register.vue'
import Profile from '../components/Profile.vue'
import Account from '../views/Account.vue'
import OauthCallBackHandler from '../views/OauthCallBackHandler.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/account',
    name: 'My Account',
    component: Account
  },
  {
    path: '/jobs',
    name: 'Jobs List',
    component: JobsList
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  
  {
    path: '/info',
    name: 'Info',
    component: Info
  },
  {
    path: '/callback',
    name: 'OauthCallBackHandler',
    component:  OauthCallBackHandler
  },
  {
    path: '/jobs/:id',
    name: 'Job Detail',
    component: JobDetail
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
export default router
