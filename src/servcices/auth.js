import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/";

const login = (username, password) => {
  return axios.post(API_URL + "signin", {
    username,
    password,
  });
};

const Auth = { login };

export default Auth;
