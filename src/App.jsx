import { useEffect } from "react";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import NewRecibo from "./components/newRecibo";

const App = () => {
  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    if (currentUser) {
      setUser(currentUser);
      setLoad(true);
      return navigate("/");
    } else {
      setLoad(true);
      return navigate("/login");
    }
  }, []);

  return (
    <>
      <Navbar currentUser={user} />
      <Routes>
        {load ? (
          user ? (
            <>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/nuevo" element={<NewRecibo />} />
            </>
          ) : (
            <Route path="*" element={<Login />} />
          )
        ) : (
          <Route path="*" element={<></>} />
        )}
      </Routes>
    </>
  );
};

export default App;
