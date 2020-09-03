import { getCurrentCredentials } from "./localstorageHelper";

const axios = require("axios");

const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.GATSBY_API_URL;

const defaultConfig = {
  baseURL: apiUrl
};

const http = axios.create(defaultConfig);

const secureHttp = axios.create(defaultConfig);

secureHttp.interceptors.request.use(
  config => {
    config.headers = getCurrentCredentials();
    return config;
  },

  error => {
    console.log(error);
  }
);

export default {
  getAllCourses() {
    return http.get(`courses`);
  },
  buyCourse(purchaseInfo) {
    return secureHttp.post(`/transactions`, purchaseInfo);
  }
};
