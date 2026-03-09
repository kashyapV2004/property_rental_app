import { toast } from "react-toastify";
import axios from "axios";

export default function Review({listings, id, setListings}) {

  const handleDeleteReview = async (reviewid) => {
    try {
      await axios.delete(
        `http://localhost:8080/listings/${id}/reviews/${reviewid}`,
        {
          withCredentials: true,
        },
      );
      setListings((prev) => ({
        ...prev,
        reviews: prev.reviews.filter((r) => r._id !== reviewid),
      }));
      toast.success("Review has been deleted successfully..");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      {/* All Reviews */}
      <p>
        <b>All Reviews</b>
      </p>
      <div className="row">
        {listings?.reviews?.map((review) => (
          <div className="card col-5 ms-3 mb-3" key={review._id}>
            <div className="card-body">
              <h5 className="card-title">{review.author.username}</h5>
              <p className="starability-result" data-rating="3">
                Rated: 3 stars
              </p>
              <p className="card-text">{review.comment}</p>
              <p className="card-text">{review.rating} Star</p>
            </div>
            <div className="mb-3">
              <button
                onClick={() => handleDeleteReview(review?._id)}
                className="btn btn-sm btn-dark"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
