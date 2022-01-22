<template>

  <ul>
    <li v-for="job in jobs" :key="job.id">
      {{ job.job_name }}
      <!-- <job v-bind:job="job" /> -->
      
    </li>
  </ul>
</template>

<script>
// import Job from "Job.vue"
import axios from "axios"

export default {
  name: "jobList",
  data() {
    return {
      jobs: [],
      access_token: null,

    }
  },
  created() {
    this.access_token = localStorage.getItem('token')
    if (this.access_token) {
      this.getjobs()
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    /* token is stored, need to get the list of jobs  */
    getjobs: async function () {
      const config = {
        method: 'get',
        url: process.env.VUE_APP_API_URL+'/api/jobs',
        headers: {
          Authorization: `Bearer ` + this.access_token,
        }

      }
      console.log(config)
      try {
        const response = await axios(config)
        this.jobs = response.data
        console.log(this.jobs)
      }
      catch (error) {
        // handle timeout
        console.log(error)
      }
    },

    getjobdata() {
      /* check if local has token */
      this.access_token = localStorage.getItem('token')
      if (!this.access_token) {
        /*send init to server */

        this.getToken()

      } else {

        /* send init to server with token */

        /* get response */
        this.getjobs()

      }
    }

  },
  // components: {
  //   Job
  // },
};
</script>

<style lang="scss" scoped>
</style>