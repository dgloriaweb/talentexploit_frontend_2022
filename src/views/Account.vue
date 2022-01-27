<template>
  <div class="card">
    <div class="card-header">Please log in</div>
    <div class="card-body">
      <form @submit="loginuser">
        <label for="name"></label>
        <input
          class="credentials"
          type="text"
          id="name"
          v-model="name"
          placeholder="username"
          required
        />
        <br />
        <label for="email"></label>
        <input
          class="credentials"
          type="text"
          id="email"
          v-model="email"
          placeholder="email address"
          required
        />
        <div v-if="v$.name.$error">Email field has an error.</div>
        <br />
        <label for="password"></label>
        <input
          class="credentials"
          type="password"
          id="password"
          v-model="password"
          placeholder="password"
          required
        />
        <br />
        <button class="submit">Submit</button>
      </form>
    </div>
    <div class="card-footer"><a href="/register">...or register</a></div>
  </div>
</template>

<script>
import axios from "axios"
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      name: { required }, // Matches this.firstName
      email: { required, email } // Matches this.contact.email
    }
  },
  data() {
    return {
      access_token: null,
      name: null,
      email: null,
      password: null,
    }
  },


  created() {
    this.access_token = localStorage.getItem('token')
    if (this.access_token) {
      this.$router.push('/jobs')
    }
  },
  methods: {

    getToken: async function () {
      // validate email address
      // validat name
      //validate password
      if (!this.name || !this.email || !this.password) {

        console.log('user credentials missing')
      } else {


        try {

          const url = process.env.VUE_APP_API_URL + '/api/login'
          const headers = {
            "grant_type": 'client_credentials',
            "client_id": process.env.VUE_APP_CLIENT_ID,
            "client_secret": process.env.VUE_APP_CLIENT_SECRET,
            "name": this.name,
            "email": this.email,
            "password": this.password,
            "password_confirmation": this.password,
          }

          const response = await axios.post(url, headers)
          // console.log(response)
          this.access_token = response.data.token
          // console.log(this.access_token)
          /*   save received token to local and setup a timer to renew token */
          localStorage.setItem('token', this.access_token)
          console.log('token saved')
        }
        catch (error) {
          // handle timeout
          console.log(error)
          console.log('user credentials wrong')
        }
      }
    },
    loginuser() {
      /* check if local has token */

      this.access_token = localStorage.getItem('token')
      if (!this.access_token) {
        /*send init to server */
        console.log('get token')
        this.getToken()
        if (this.access_token) {

          console.log('token received')

          this.$router.push('/jobs')
        }


      } else {

        console.log('token ok')
        this.$router.push('/jobs')
      }


    },


  },
  components: {

  },

}
</script>

<style lang="scss" scoped>
</style>