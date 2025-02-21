import axios from "axios";

export const api = axios.create({
  baseURL: `http://url:${process.env.PORT || 4001}`,
});
