import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../../public/css/home.css";

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useUser();

  return (
    <div className="home-container">
        
      <div className="hero-section text-center d-flex flex-column justify-content-center align-items-center">
        <h1 className="hero-title">Find your next stay</h1>
        <p className="hero-subtitle">
          Discover amazing places at the best prices
        </p>
        <div className="mt-4">
          <button
            className="btn btn-danger me-3"
            onClick={() => navigate("/listings")}
          >
            Explore Listings
          </button>
          {!currentUser && (
            <>
              <button
                className="btn btn-outline-dark me-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>


      <div className="container mt-5">
        <h3 className="mb-4">Browse by Category</h3>
        <div className="row text-center">
          {["Beach", "Mountain", "City", "Camping", "Luxury", "Farm"].map(
            (cat, index) => (
              <div className="col-md-2 col-4 mb-3" key={index}>
                <div
                  className="category-card p-3"
                  onClick={() => navigate(`/listings?search=${cat}`)}
                >
                  <p className="mb-0">{cat}</p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section text-center mt-5 p-5">
        <h2>Become a host</h2>
        <p>Earn money by sharing your space with travelers</p>
        <button
          className="btn btn-dark"
          onClick={() => navigate("/listings/new")}
        >
          Add Your Listing
        </button>
      </div>
    </div>
  );
}
