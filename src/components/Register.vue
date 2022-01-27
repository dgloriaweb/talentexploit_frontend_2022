<template>
  <div class="col-md-12">
    <div>
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div>
            <label for="name">name</label>
            <Field name="name" type="text"  class="credentials"/>
            <ErrorMessage name="name" class="error-feedback" />
          </div>
          <div>
            <label for="email">Email</label>
            <Field name="email" type="email"  class="credentials"/>
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div>
            <label for="password">Password</label>
            <Field name="password" type="password"  class="credentials"/>
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div>
            <label for="password_confirmation">Password_confirmation</label>
            <Field name="password_confirmation" type="password"  class="credentials"/>
            <ErrorMessage name="password_confirmation" class="error-feedback" />
          </div>

          <div>
            <button>Sign Up</button>
          </div>
        </div>
      </Form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate"
import * as yup from "yup"

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      name: yup
        .string()
        .required("name is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      password_confirmation: yup
        .string()
        .required("Please repeat password!")
        .oneOf([yup.ref("password")], "Passwords do not match"),
    })

    return {
      successful: false,
      message: "",
      schema,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile")
    }
  },
  methods: {
    handleRegister(user) {
      this.message = ""
      this.successful = false

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message
          this.successful = true
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          this.successful = false
        }
      )
    },
  },
};
</script>

<style scoped>
</style>