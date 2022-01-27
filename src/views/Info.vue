<template>
  <div>
    <img v-bind:src="flowchart_image_url" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      flowchart_image_url: process.env.VUE_APP_BASE_URL + "/images/flowchart.png"
    }
  }
}
</script>
