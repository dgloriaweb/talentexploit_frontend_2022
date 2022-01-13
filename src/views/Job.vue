<template>
  <div>
    <router-link :to="jobPath">
      {{ job.job_name }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["job"],
  computed: {
    jobPath: function () {
      return `/jobs/${this.job.id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>