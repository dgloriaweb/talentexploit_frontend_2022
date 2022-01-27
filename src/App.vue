<template>
  <myheader />
  <div id="wrapper">
    <router-view />
  </div>
  <myfooter />
</template>

<script>
import myfooter from "./components/Myfooter.vue"
import myheader from "./components/Myheader.vue"
export default {
 
  components: {
    myfooter,
    myheader
  }
}
</script>

<style>
@import "./assets/styles/style.css";

#wrapper {
  width: 90vw;
  margin: auto;
  min-height: 90vh;
}
</style>
