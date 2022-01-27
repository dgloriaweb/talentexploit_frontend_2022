
<script>
export default {
  created() {
    localStorage.clear('token')
    localStorage.clear('user')
    this.$router.push('/')
  }
}
</script>
