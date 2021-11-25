import axios from "axios";

export default axios.create({
  baseURL: process.env.BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
