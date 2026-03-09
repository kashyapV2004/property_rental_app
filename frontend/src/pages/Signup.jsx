import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/signup", formData, {
        withCredentials: true,
      });
      if (res.data.success) {
        const currentUser = await axios.get(
          "http://localhost:8080/current-user",
          {
            withCredentials: true,
          },
        );
        setCurrentUser(currentUser.data);
        navigate("/listings");
        toast.success("You have successfully registered...");
      }
    } catch (err) {
      toast.error(err.message);
      console.log("Error:", err.message);
    }
  };

  return (
    <div className="row mt-3">
      <h3 className="col-6 offset-2">SingUp For Wanderlust </h3>
      <div className="col-8 offset-2">
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              className="form-control"
              name="username"
              required
            />
            <div className="valid-feedback">username looks good</div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              onChange={handleInputChange}
              type="email"
              className="form-control"
              name="email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={handleInputChange}
              type="password"
              className="form-control"
              name="password"
              required
            />
          </div>

          <button type="submit" className="btn btn-success">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
