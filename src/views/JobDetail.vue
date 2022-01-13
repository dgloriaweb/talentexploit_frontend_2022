<template>
    <div>
        <h1>{{ job.job_name }}</h1>
        <h1>Drivers license: {{ job.job_drivers_licenses[0].driver.drivers_license }}</h1>
    </div>
</template>

<script>
    export default {
         data() {
    return {
      job: {}
    };
  },
     created: function() {
    this.fetchData();
  },

    computed: {
    styles() {
      return {
      };
    }
  },
  methods: {
    fetchData: async function() {
      try {
        const res = await fetch(
          `http://localhost/api/jobs/${this.$route.params.id}`
        );
        const job = await res.json();
        this.job = job;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>