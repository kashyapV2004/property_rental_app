import API from "../api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import Review from "../component/Review";
import ReviewForm from "../component/ReviewForm";

export default function Show() {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const [listings, setListings] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    API
      .get(`/listings/${id}`)
      .then((res) => {
        setListings(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  }, [id]);

  const handleDelete = async () => {
    if (currentUser && listings?.owner?._id !== currentUser._id) {
      toast.error("You are not authorized...");
      return;
    }
    try {
      await API.delete(`/listings/${id}`);
      navigate("/listings");
      toast.success("Deleted successfully...");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/login", { state: { from: location.pathname } });
      }
    }
    console.log("Delete Successfully");
  };

  return (
    <>
      <div className="row">
        <div className="col-8 offset-2 mt-3">
          <h3>{listings?.title}</h3>
        </div>
        <div className="card col-6 offset-2 show-card listing-card">
          <img
            src={listings?.image?.url}
            className="card-img-top show-image"
            alt={listings?.image?.filename}
          />

          <div className="card-body">
            <p className="card-text">
              <i>
                <b>Owned By</b> {listings?.owner?.username}
              </i>
            </p>
            <p className="card-text">{listings?.description}</p>
            <p className="card-text">
              &#8377; {listings?.price?.toLocaleString("en-IN")}
            </p>
            <p className="card-text">{listings?.location}</p>
            <p className="card-text">{listings?.country}</p>
          </div>
        </div>
        <br />
        {currentUser && listings?.owner?._id === currentUser._id && (
          <div className="btns mb-3">
            <button
              className="btn btn-dark col-1 offset-2 edit-btn"
              onClick={() => navigate(`/listings/${listings._id}/edit`)}
            >
              Edit
            </button>

            <button
              className="btn btn-dark col-1 ms-2 p-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}

        <div className="col-8 offset-2 mb-3">
          <ReviewForm id={id} currentUser={currentUser} />
          <hr />
          <Review
            id={id}
            currentUser={currentUser}
            listings={listings}
            setListings={setListings}
          />
        </div>
      </div>
    </>
  );
}
