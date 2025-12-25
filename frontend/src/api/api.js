import axios from "axios";

export const api = axios.create({
  baseURL: "https://portfolio-maker-2x9r.onrender.com/api/",
});
