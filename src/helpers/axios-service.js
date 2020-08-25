import { getCurrentCredentials } from './localstorageHelper'

const axios = require('axios')

const railsUrl = process.env.GATSBY_RAILS_API
const nodeUrl = process.env.GATSBY_NODE_API
// const authHeaders = getCurrentCredentials()

const defaultConfig = {
  baseURL: railsUrl,
}

const http = axios.create(defaultConfig)

const secureHttp = axios.create(defaultConfig)

secureHttp.interceptors.request.use(
  (config) => {
    config.headers = getCurrentCredentials()
    return config
  },

  (error) => {
    console.log(error)
  }
)

const nodeHttp = axios.create({
  baseURL: nodeUrl
})

export default {
  getAllCourses() {
    return http.get(`courses`)
  },
  buyCourse(purchaseInfo) {
    return secureHttp.post(`/transactions`, purchaseInfo)
  },
  loginToNode(data) {
    return nodeHttp.post('auth/login', data, { withCredentials: true })
  },
  logoutFromNode() {
    return nodeHttp.delete('auth/logout')
  },
}
