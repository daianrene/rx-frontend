import { Link } from "react-router-dom";

const Navbar = ({ currentUser }) => {
  const getNav = () => {
    if (!currentUser)
      return (
        <li className="nav-item">
          <Link to={"/login"} className="nav-link">
            Ingresar <i className="material-icons">login</i>
          </Link>
        </li>
      );
    return (
      <>
        <li className="nav-item">
          <Link to={"/"} className="nav-link">
            Recibos <i className="material-icons-outlined">description</i>
          </Link>
        </li>

        <li className="nav-item">
          <a
            href="/login"
            className="nav-link"
            onClick={() => {
              sessionStorage.removeItem("user");
            }}
          >
            Cerrar sesion <i className="material-icons ">logout</i>
          </a>
        </li>
      </>
    );
  };

  return (
    <nav className="navbar  navbar-expand  navbar-dark bg-dark py-3 ">
      <Link to={!currentUser ? "login" : "/"} className="navbar-brand">
        <div className="h2">Sistema Recibo X</div>
      </Link>

      <div className="navbar-nav ml-auto">{getNav()}</div>
    </nav>
  );
};

export default Navbar;
