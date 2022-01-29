import axios from 'axios';
import authHeader from './auth-header';


class JobService {
  getAllJobs() {
    return axios.get(process.env.VUE_APP_API_URL + '/api/jobs', { headers: authHeader() });
  }
}

export default new JobService();