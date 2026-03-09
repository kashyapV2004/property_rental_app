import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Nav() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get(
        "http://localhost:8080/logout",{
          withCredentials: true,
        },
      );
      setCurrentUser(null);
      navigate("/listings");
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-md bg-body-light border-bottom sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/listings">
            <i className="fa-regular fa-compass"></i>homeQuest
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" to="/listings">
                Explore
              </Link>
            </div>

            <div className="navbar-nav mx-auto">
              <form
                className="d-flex"
                role="search"
                action="/listings"
                method="GET"
              >
                <input
                  className="form-control me-2"
                  type="search"
                  name="search"
                  placeholder="Search Destination"
                  aria-label="Search"
                />
                <button className="btn btn-outline-danger" type="submit">
                  Search
                </button>
              </form>
            </div>

            <div className="navbar-nav ms-auto">
              <Link className="nav-link" to="/listings/new">
                Add new Listing
              </Link>
              {!currentUser && (
                <>
                  <Link className="nav-link" to="/signup">
                    <b>Sign up</b>
                  </Link>
                  <Link className="nav-link" to="/login">
                    <b>Log in</b>
                  </Link>
                </>
              )}
              {currentUser && (
                <button onClick={handleLogout} className="nav-link">
                  <b>Log out</b>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
