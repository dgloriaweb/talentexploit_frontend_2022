<template>
  <Form @submit="handleLogin" :validation-schema="schema">
    <div>
      <label for="name">Name</label>
      <Field name="name" type="text" class="credentials"/>
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div>
      <label for="email">Email</label>
      <Field name="email" type="email" class="credentials"/>
      <ErrorMessage email="email" class="error-feedback" />
    </div>
    <div>
      <label for="password">Password</label>
      <Field name="password" type="password" class="credentials"/>
      <ErrorMessage name="password" class="error-feedback" />
    </div>

    <div>
      <button>
        <span>Login</span>
      </button>
    </div>

    <div>
      <div v-if="message" class="alert alert-danger" role="alert">
        {{ message }}
      </div>
    </div>
  </Form>
  <a href="/register">Or register here...</a>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate"
import * as yup from "yup"

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      name: yup.string().required("name is required!"),
      password: yup.string().required("Password is required!"),
      // email: yup.string().required("email is required!"),
    })

    return {
      message: "",
      schema,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile")
    }
  },
  methods: {
    handleLogin(user) {

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile")
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        }
      )
    },
  },
};
</script>

<style scoped>
</style>