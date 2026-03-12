import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./component/Nav.jsx";
import Footer from "./component/footer.jsx";
import Home from "./pages/Home.jsx";
import AddListing from "./pages/AddListing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Listings from "./pages/Listings.jsx";
import Show from "./pages/Show.jsx";
import Edit from "./pages/Edit.jsx";
import UserContext from "./context/UserContext.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderProvider } from "./context/LoaderContext.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/current-user", {
        withCredentials: true,
      })
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  }, []);

  return (
    <>
      <LoaderProvider>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Nav />
          <ToastContainer />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/listings/new" element={<AddListing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/listings/:id" element={<Show />} />
              <Route path="/listings/:id/edit" element={<Edit />} />
            </Routes>
          </div>
          <Footer />
        </UserContext.Provider>
      </LoaderProvider>
    </>
  );
}

export default App;
