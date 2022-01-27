<template>
  <div id="header">
    <div id="nav">
      <router-link to="/info">Dashboard | </router-link>
      <router-link to="/info">About | </router-link> 
      <router-link to="/jobs" v-if="loggedIn">Jobs</router-link>
      <router-link to="/" v-if="showlogin"> | Login/register</router-link>
      <router-link to="/logout" v-if="loggedIn"> | Logout</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    //if no token or on login page don't show login register in header
    showlogin() {
      if (this.$route.path != '/' && !this.loggedIn) {
        return true
      }
      return false
    }
  },
  data() {
    return {
      token: localStorage.getItem('token'),
      loggedIn : localStorage.getItem('user')
    }
  },
}
</script>

<style scoped>
#header {
  margin: 0;
  color: coral;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 22px;
  text-transform: uppercase;
  min-height: 44px;
  max-height: 5vh;
}
#nav {
  background: white;
  padding: 10px;
  width: 100%;
  height: 100%;
}
</style>