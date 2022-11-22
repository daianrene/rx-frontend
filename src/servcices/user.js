import axios from "axios";
import authHeader from "../servcices/auth-header";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/";

const getRecibos = () => {
  return axios
    .get(API_URL + "user/recibos", { headers: authHeader() })
    .catch((err) => {
      console.log(err);
    });
};

const postRecibo = (form, setPrint) => {
  axios
    .post(
      API_URL + "user/addrecibo",
      {
        form,
      },
      { headers: authHeader() }
    )
    .then((res) => {
      setPrint((pre) => !pre);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const Users = { getRecibos, postRecibo };

export default Users;
