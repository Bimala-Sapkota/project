import axios from "axios";

const instance = axios.create({
  baseURL: "https://project-p8ej.onrender.com", // .env ko api

  timeout: 10000,
});

export default instance;
