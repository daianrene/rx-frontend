import axios from "axios";
import authHeader from "../servcices/auth-header";

const getRecibos = () => {
  return axios
    .get("http://localhost:4000/api/user/recibos", { headers: authHeader() })
    .catch((err) => {
      console.log(err);
    });
};

const postRecibo = (form, setPrint) => {
  axios
    .post(
      "http://localhost:4000/api/user/addrecibo",
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
