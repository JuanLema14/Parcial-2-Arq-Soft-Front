import { boot } from 'quasar/wrappers'
import axios from 'axios'
import qs from 'qs'

const axiosInstanceBaseURL = 'http://localhost:8080/api/'

const axiosInstance = axios.create({
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  },
  baseURL: axiosInstanceBaseURL,
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
})

export { axiosInstance }
