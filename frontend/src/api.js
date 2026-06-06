import axios from "axios";

const api = axios.create({
  baseURL: "https://my-foodhub-app.onrender.com",
});

export default api;