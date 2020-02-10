const axios = require("axios");

const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.GATSBY_API_URL;

const defaultConfig = {
  baseURL: apiUrl
};

const http = axios.create(defaultConfig);

export default {
  getAllCourses() {
    return http.get(`courses`);
  }
};
