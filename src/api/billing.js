import axios from "axios";

export const billing = axios.create({
  baseURL: "http://localhost:1555",
  withCredentials: true,
});

export const provision = axios.create({
  baseURL: "http://localhost:3555",
  withCredentials: true,
});
