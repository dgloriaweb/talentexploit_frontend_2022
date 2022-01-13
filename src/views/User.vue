<template>
  <div>
    <router-link :to="userPath">
      {{ user.user_name }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["user"],
  computed: {
    userPath: function () {
      return `/users/${this.user.id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>