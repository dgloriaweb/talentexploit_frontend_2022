import axios from 'axios'


class AuthService {
  login(user) {
    const headers = {
        grant_type: 'client_credentials',
        client_id: process.env.VUE_APP_CLIENT_ID,
        client_secret: process.env.VUE_APP_CLIENT_SECRET,
        name: user.name,
        email: user.email,
        password: user.password,
        password_confirmation: user.password,
      }
    return axios
      .post(process.env.VUE_APP_API_URL + '/api/login', headers)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        console.log('token saved')
        return response.data
      })
      .catch((error) => {
        console.log(error.response.data.error)
      })
  }
  logout() {
    localStorage.removeItem('user');
  }
  register(user) {
    return axios
    .post(process.env.VUE_APP_API_URL + '/api/register', {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password,
    })
    .catch((error) => {
      console.log(error.response.data.error)
    });
  }
}
export default new AuthService();