import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.example.com", // .env ko api

  timeout: 10000,
});

export default instance;
